import React, { useState } from "react";
import { useSelector } from 'react-redux'
import api from "../service/api";
import { useDispatch } from 'react-redux'
import { addUnidade } from '../store/Unidades/unidades.actions'

export default function EditarNegocio(props) {
    const idNegocio = props.idDoNegocio
    const token = localStorage.getItem('token')
    const dispatch = useDispatch()
    const [erro, setErro] = useState('')
    const [popUp, setPopUp] = useState(false)
    const [dadosUnidade, setDadosUnidade] = useState({
        nomeUnidade: '',
        linkWpp: '',
        cep: '',
        rua: '',
        numero: '',
        complemento: '',
        bairro: '',
        cidade: '',
        uf: ''
    })

    const pegarDadosUnidadde = (e) => {
        setErro('')
        setDadosUnidade({...dadosUnidade, [e.target.name]: e.target.value})
    }

    const buscarCep = () => {
        setErro('')
        api.get(`https://viacep.com.br/ws/${dadosUnidade.cep}/json/`)
        .then((res) => {
            console.log(res)
            const end = res.data
            if(end.erro) {
                setErro('Este cep não existe')
                setDadosUnidade({
                    ...dadosUnidade, 
                    rua: '', 
                    bairro: '', 
                    cidade: '',
                    uf: ''
                })
            } else {
                setDadosUnidade({
                    ...dadosUnidade, 
                    rua: end.logradouro, 
                    bairro: end.bairro, 
                    cidade: end.localidade,
                    uf: end.uf
                })
            }
        }).catch((err) => {
            console.log(err)
            setErro('Cep digitado incorretamente')
            setDadosUnidade({
                ...dadosUnidade, 
                rua: '', 
                bairro: '', 
                cidade: '',
                uf: ''
            })
        })
    }

    const validarDadosUnidade = () => {
        const body = {
            nome: dadosUnidade.nomeUnidade,
            link_whatsapp: dadosUnidade.linkWpp,
            cep: dadosUnidade.cep,
            rua: dadosUnidade.rua,
            numero: dadosUnidade.numero,
            complemento: dadosUnidade.complemento,
            bairro: dadosUnidade.bairro,
            cidade: dadosUnidade.cidade,
            estado: dadosUnidade.uf,
            validar: 1
        }
        api.post('/api/v1/unidade', body, {
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            console.log(res)
            criarUnidade()
        }).catch((err) => {
            console.log(err.response.data.errors)
            let e = err.response.data.errors
            if(e.nome) {
                setErro(e.nome[0])
            } else if(e.link_whatsapp) {
                setErro(e.link_whatsapp[0])
            } else if(e.cep) {
                setErro(e.cep[0])
            } else if(e.rua) {
                setErro(e.rua[0])
            } else if(e.numero) {
                setErro(e.numero[0])
            }
        })
    }

    const criarUnidade = () => {
        const body = {
            negocio_id: idNegocio,
            nome: dadosUnidade.nomeUnidade.toLowerCase(),
            link_whatsapp: dadosUnidade.linkWpp,
            cep: dadosUnidade.cep,
            rua: dadosUnidade.rua.toLowerCase(),
            numero: dadosUnidade.numero,
            complemento: dadosUnidade.complemento.toLowerCase(),
            bairro: dadosUnidade.bairro.toLowerCase(),
            cidade: dadosUnidade.cidade.toLowerCase(),
            estado: dadosUnidade.uf.toLowerCase()
        }
        api.post('/api/v1/unidade', body, {
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            console.log(res)
            dispatch(addUnidade(res.data))
            setDadosUnidade({
                nomeUnidade: '',
                linkWpp: '',
                cep: '',
                rua: '',
                numero: '',
                complemento: '',
                bairro: '',
                cidade: '',
                uf: ''
            })
            setPopUp(false)
        }).catch((err) => {
            console.log(err)
        })
    }

    const negocios = useSelector((state) => {
        return state.negocios
    })

    const unidades = useSelector((state) => {
        return state.unidades
    })

    const usuarios = useSelector((state) => {
        return state.usuarios
    })

    const negocioAtual = negocios.filter((negocio) => {
        return negocio.id === idNegocio
    })

    const unidadeAtual = unidades.filter((unidade) => {
        return unidade.negocio_id === idNegocio
    })

    const usuarioAtual = usuarios.filter((usuario) => {
        return usuario.negocio_id === idNegocio
    })

    const listUnidades = unidadeAtual.map((unidade) => {
        return (
            <div>
                <h5>{unidade.nome}</h5>
                <p><a href={unidade.link_whatsapp}>Acessar whatsapp</a></p>
                <p>Endereço: <br/>
                    {unidade.rua}, {unidade.numero} - {unidade.bairro}<br/>
                    {unidade.cidade} {unidade.estado}
                </p>
            </div>
        )
    })

    return (
        <div>
            <div>
                <button onClick={props.voltar}>Voltar</button>
                <h2>Dados do negócio</h2>
                <div className="negocio">
                    <h3>{negocioAtual[0].nome}</h3>
                    <p>Tipo: {negocioAtual[0].tipo}</p>
                    <p>Nome único: {negocioAtual[0].pagina}</p>
                </div>

                <div className="unidade">
                    <h4>Unidades</h4>
                    {listUnidades}
                    <button onClick={() => setPopUp(true)}>+ Nova unidade</button>
                </div>

                <div className="usuario">
                    <h4>Usuários do sistema</h4>
                    <h5>{usuarioAtual[0].nome}</h5>
                    <p>Email: {usuarioAtual[0].email}</p>
                    <p>Contato: {usuarioAtual[0].telefone}</p>
                    <p>{usuarioAtual[0].proprietario ? 'Proprietário' : 'Funcionário'}</p>
                </div>

                {popUp && 
                    <div>
                        <p>Crie uma unidade</p>
                        <div className="form-unidade">
                            <input 
                                name="nomeUnidade" 
                                placeholder="Nome da unidade" 
                                value={dadosUnidade.nomeUnidade}
                                onChange={pegarDadosUnidadde}
                            />

                            <input 
                                name="linkWpp" 
                                placeholder="Link WhatsApp" 
                                value={dadosUnidade.linkWpp}
                                onChange={pegarDadosUnidadde}
                            />

                            <input 
                                name="cep" 
                                placeholder="Cep"
                                value={dadosUnidade.cep}
                                onChange={pegarDadosUnidadde}
                            />
                            <button onClick={buscarCep}>Buscar</button>

                            <input 
                                name="rua" 
                                placeholder="Rua"
                                value={dadosUnidade.rua}
                                onChange={pegarDadosUnidadde}
                            />

                            <input 
                                name="numero" 
                                placeholder="Numero"
                                value={dadosUnidade.numero}
                                onChange={pegarDadosUnidadde}
                            />

                            <input 
                                name="complemento" 
                                placeholder="Complemento"
                                value={dadosUnidade.complemento}
                                onChange={pegarDadosUnidadde}
                            />

                            <input 
                                name="bairro" 
                                placeholder="Bairro"
                                value={dadosUnidade.bairro}
                                onChange={pegarDadosUnidadde}
                            />

                            <input 
                                name="cidade" 
                                placeholder="Cidade"
                                value={dadosUnidade.cidade}
                                onChange={pegarDadosUnidadde}
                            />

                            <input 
                                name="uf" 
                                placeholder="Estado"
                                value={dadosUnidade.uf}
                                onChange={pegarDadosUnidadde}
                            />
                            <p>{erro}</p>
                            <button onClick={validarDadosUnidade}>Criar</button>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}