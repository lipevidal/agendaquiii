import React, { useEffect, useState } from "react";
import api from "../service/api";
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ListaNegocios from "../Components/Negocios/ListaNegocios";
import ListaUnidades from '../Components/Unidades/ListaUnidades'
import { addUnidades } from "../store/Unidades/unidades.actions";

export default function Adm() {
    const [esperar, setEsperar] = useState(true)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    const [loading, setLoading] = useState(false)
    const [botaoTornarPendente, setBotaoTornarPendente] = useState(false)
    const [botaoGerenciarPagamentos, setBotaoGerenciarPagamentos] = useState(false)

    const unidades = useSelector((state) => {
        return state.unidades
    })

    useEffect(() => {
        buscarUser()
        verificarAtualizacao()
    }, [])

    const verificarAtualizacao = () => {
        setLoading(true)
        api.get(`/api/v1/atualizacao/1`, {
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            console.log(res.data)
            if(res.data === 'atualizar_status') {
                setBotaoTornarPendente(true)
            } else if (res.data === 'atualizar_geral') {
                setBotaoGerenciarPagamentos(true)
            }
        }).catch((err) => {
            console.log(err)
        }).finally(() => {
            setLoading(false)
        })
    }

    const tornarPendente = () => {
        setLoading(true)

        for(let unidade of unidades) {
            const body = {
                tornar_pendente: true
            }
            api.put(`/api/v1/unidade/${unidade.id}`, body, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }).then((res) => {
                console.log(res)
            }).catch((err) => {
                console.log(err)
            })
        }

        api.get('/api/v1/unidade', {
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            console.log(res.data)
            dispatch(addUnidades(res.data))
        }).catch((err) => {
            console.log(err)
        })

        const dados = {
            data_atual_status: true
        }
        api.put(`/api/v1/atualizacao/1`, dados, {
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            console.log(res)
        }).catch((err) => {
            console.log(err)
        }).finally(() => {
            setLoading(false)
        })
    }

    const gerenciarPagamentos = () => {
        setLoading(true)
        //mudar setLoading para false
    }

    const buscarUser = () => {
        const vazio = ''
        api.post('/api/v1/me', vazio, {
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            console.log(res.data)
            if(!res.data.adm) {
                navigate('/erro')
            }
        }).catch((err) => {
            console.log(err)
        }).finally(() => {
            setEsperar(false)
        })
    }

    return (
        <div className="adm">
            {!esperar &&
            <div>
                <h1>Painel Administrativo</h1>
                {botaoTornarPendente && <button onClick={tornarPendente}>Atualizar</button>}
                {botaoGerenciarPagamentos && <button onClick={gerenciarPagamentos}>Atualizar</button>}
                <div>
                    <ListaNegocios />
                    <ListaUnidades />
                </div>
            </div>
            }
        </div>
    )
}