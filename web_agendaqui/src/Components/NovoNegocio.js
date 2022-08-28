import React, { useState } from "react";
import api from "../service/api";
import { useDispatch } from 'react-redux'
import { addNegocio } from '../store/Negocios/negocios.actions'
import { addUnidade } from '../store/Unidades/unidades.actions'
import { addUsuario } from '../store/Usuarios/usuarios.actions'

export default function NovoNegocio(props) {
    const dispatch = useDispatch()
    const token = localStorage.getItem('token')
    const [negocioId, setNegocioId] = useState('')
    const [erro, setErro] = useState('')
    const [paginas, setPaginas] = useState({
        criarNegocio: true,
        criarUnidade: false,
        criarUsuario: false
    })

    const [dadosNegocio, setDadosNegocio] = useState({
        logo: '',
        nomeNegocio: '',
        tipoNegocio: '',
        paginaNegocio: '',
    })

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

    const [dadosUsuario, setDadosUsuario] = useState({
        nomeUsuario: '',
        sobrenome: '',
        email: '',
        wpp: '',
        senha: '',
        proprietario: true
    })

    const pegarDadosNegocio = (e) => {
        setErro('')
        setDadosNegocio({...dadosNegocio, [e.target.name]: e.target.value})
    }

    const pegarLogo = (e) => {
        e.preventDefault();
        setErro('')
        setDadosNegocio({...dadosNegocio, logo: e.target.files[0]})
    }

    const pegarDadosUnidadde = (e) => {
        setErro('')
        setDadosUnidade({...dadosUnidade, [e.target.name]: e.target.value})
    }

    const pegarDadosUsuario = (e) => {
        setErro('')
        setDadosUsuario({...dadosUsuario, [e.target.name]: e.target.value})
        console.log(dadosUsuario.proprietario)
    }

    const pegarCheckbox = (e) => {
        setErro('')
        setDadosUsuario({...dadosUsuario, proprietario: e.target.checked})
        console.log(dadosUsuario.proprietario)
    }

    const pegarTelefone = (e) => {
        setErro('')
        let value = e.target.value
        value = value
          .replace(/[\D]/g, '')
          .replace(/(\d{2})(\d)/, '($1) $2')
          .replace(/(\d{5})(\d)/, '$1-$2')
          .replace(/(-\d{4})(\d+?)/, '$1')
          setDadosUsuario({...dadosUsuario, wpp: value})
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

    const validarDadosNegocio = () => {
        let formData = new FormData();
        formData.append('nome', dadosNegocio.nomeNegocio.toLowerCase())
        formData.append('logo', dadosNegocio.logo)
        formData.append('tipo', dadosNegocio.tipoNegocio.toLowerCase())
        formData.append('pagina', dadosNegocio.paginaNegocio.toLowerCase())
        
        api.post('/api/v1/negocio', formData, {
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            console.log(res)
            setPaginas({...paginas, criarNegocio: false, criarUnidade: true})
            setErro('')
        }).catch((err) => {
            console.log(err)
            console.log(err.response.data.errors)
            let e = err.response.data.errors
            if(e.logo) {
                setErro(e.logo[0])
            } else if(e.nome) {
                setErro(e.nome[0])
            } else if(e.pagina) {
                setErro(e.pagina[0])
            } else if(e.tipo) {
                setErro(e.tipo[0])
            }
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
            setPaginas({...paginas, criarUnidade: false, criarUsuario: true})
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

    const validarDadosUser = () => {
        const body = {
            nome: dadosUsuario.nomeUsuario + ' ' + dadosUsuario.sobrenome,
            email: dadosUsuario.email,
            telefone: dadosUsuario.wpp,
            password: dadosUsuario.senha,
            proprietario: dadosUsuario.proprietario,
            validar: true
        }
        api.post('/api/v1/user', body, {
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            console.log(res)
            salvarNegocio()
        }).catch((err) => {
            console.log(err.response.data.errors)
            let e = err.response.data.errors
            if(e.nome) {
                setErro(e.nome[0])
            } else if(e.email) {
                setErro(e.email[0])
            } else if(e.telefone) {
                setErro(e.telefone[0])
            } else if(e.password) {
                setErro(e.password[0])
            } else if(e.numero) {
                setErro(e.password[0])
            }
        })
    }

    const salvarUnidade = (id) => {
        const body = {
            negocio_id: id,
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
        }).catch((err) => {
            console.log(err)
        })
    }

    const salvarUser = (id) => {
        const body = {
            negocio_id: id,
            nome: dadosUsuario.nomeUsuario.toLowerCase() + ' ' + dadosUsuario.sobrenome.toLowerCase(),
            email: dadosUsuario.email.toLocaleLowerCase(),
            telefone: dadosUsuario.wpp.toLocaleLowerCase(),
            password: dadosUsuario.senha,
            proprietario: dadosUsuario.proprietario
        }
        api.post('/api/v1/user', body, {
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            console.log(res)
            dispatch(addUsuario(res.data))
        }).catch((err) => {
            console.log(err)
        }).finally(() => {
            props.voltar()
        })
    }

    const salvarNegocio = () => {
        setErro('')
        console.log(dadosNegocio.nomeNegocio)
        let formData = new FormData();
        formData.append('nome', dadosNegocio.nomeNegocio.toLowerCase())
        formData.append('logo', dadosNegocio.logo)
        formData.append('tipo', dadosNegocio.tipoNegocio.toLowerCase())
        formData.append('pagina', dadosNegocio.paginaNegocio.toLowerCase())
        formData.append('naoValidar', 0)

        api.post('/api/v1/negocio', formData, {
            headers: {
                'Accept': 'application/json',
                'content-type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            }
        }).then((res) => {
            console.log(res)
            dispatch(addNegocio(res.data))
            salvarUnidade(res.data.id)
            salvarUser(res.data.id)
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <div className="novo-usuario">
            <button onClick={props.voltar}>Voltar</button>
            <h2>Novo Negócio</h2>

            {paginas.criarNegocio && 
                <div className="negocio">
                    <p>Crie um négocio</p>
                    <div className="form-negocio">
                        <input 
                            type="file" 
                            name="logo" 
                            accept=".png, .jpg .jpeg" 
                            placeholder="Logo do Negócio" 
                            onChange={pegarLogo}
                        />

                        <input 
                            name="nomeNegocio" 
                            value={dadosNegocio.nomeNegocio} 
                            placeholder="Nome do Negócio" 
                            onChange={pegarDadosNegocio}
                        />

                        <input 
                            name="tipoNegocio" 
                            value={dadosNegocio.tipoNegocio} 
                            placeholder="Tipo de Negócio" 
                            onChange={pegarDadosNegocio}
                        />

                        <input 
                            name="paginaNegocio" 
                            value={dadosNegocio.paginaNegocio.trim()} 
                            placeholder="Nome da página do negócio" 
                            onChange={pegarDadosNegocio}
                        />
                        <p>{erro}</p>
                        <button onClick={validarDadosNegocio}>Próximo</button>
                    </div>
                </div>
            }
            
            {paginas.criarUnidade &&
                <div className="unidade">
                    <h3>Unidade</h3>
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
                        <button 
                            onClick={() => 
                            setPaginas({criarNegocio: true, criarUnidade: false, criarUsuario: false})}>
                                Anterior
                        </button>
                        <button onClick={validarDadosUnidade}>Próximo</button>
                    </div>
                </div>
            }

            {paginas.criarUsuario &&
                <div className="usuario">
                    <h3>Usuário</h3>
                    <p>Crie um usuário para acessar o sistema</p>
                    <div className="form-usuario">
                        <input 
                            placeholder="nome"
                            name="nomeUsuario"
                            value={dadosUsuario.nomeUsuario}
                            onChange={pegarDadosUsuario}
                        />

                        <input
                            placeholder="sobrenome"
                            name="sobrenome"
                            value={dadosUsuario.sobrenome}
                            onChange={pegarDadosUsuario}
                        />

                        <input 
                            placeholder="email"
                            name="email"
                            value={dadosUsuario.email}
                            onChange={pegarDadosUsuario}
                        />

                        <input 
                            placeholder="whatsapp"
                            name="wpp"
                            value={dadosUsuario.wpp}
                            onChange={pegarTelefone}
                        />

                        <input 
                            placeholder="senha"
                            name="senha"
                            value={dadosUsuario.senha}
                            onChange={pegarDadosUsuario}
                        />

                        <div className="input-checkbox">
                            {dadosUsuario.proprietario ?
                                <input 
                                    type="checkbox"
                                    name="proprietario"
                                    onChange={pegarCheckbox}
                                    checked
                                /> 
                                : 
                                <input 
                                    type="checkbox"
                                    name="proprietario"
                                    onChange={pegarCheckbox}
                                />
                            }
                            
                            <span>Definir como proprietário</span>
                        </div>
                        <p>{erro}</p>
                        <button 
                            onClick={() => 
                            setPaginas({criarNegocio: false, criarUnidade: true, criarUsuario: false})}>
                                Anterior
                        </button>
                        <button onClick={validarDadosUser}>Salvar</button>
                    </div>
                </div>
            }
        </div>
    )
}