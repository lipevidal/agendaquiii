import React, { useState } from "react";
import api from "../service/api";
import { useNavigate } from 'react-router-dom'

export default function Login() {
    const navigate = useNavigate()
    const [erro, setErro] = useState('')
    const [dadosLogin, setDadosLogin] = useState({
        email: '',
        senha: ''
    })

    const pegarDadosLogin = (e) => {
        setErro('')
        setDadosLogin({...dadosLogin, [e.target.name]: e.target.value})
    }

    const logar = () => {
        const body = {
            email: dadosLogin.email,
            password: dadosLogin.senha
        }
        api.post('/api/login', body, {
            headers: {
                Accept: 'application/json'
            }
        }).then((res) => {
            console.log(res.data.token)
            localStorage.setItem('token', res.data.token)

            const vazio = ''
            api.post('/api/v1/me', vazio, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${res.data.token}`
                }
            }).then((res) => {
                console.log(res.data)
                if(res.data.adm) {
                    navigate('/adm')
                }
            }).catch((err) => {
                console.log(err)
            })

        }).catch((err) => {
            console.log(err.response.data.erro)
            setErro(err.response.data.erro)
        })
    }

    return (
        <div className="login">
            <h1>Entrar</h1>
            <div className="form">
                <input name="email" value={dadosLogin.email} placeholder="email" onChange={pegarDadosLogin}/>
                <input type="password" name="senha" value={dadosLogin.senha} placeholder="senha" onChange={pegarDadosLogin}/>
                <p>{erro}</p>
                <button onClick={logar}>Entrar</button>
            </div>
        </div>
    )
}