import React, { useEffect, useState } from "react";
import api from "../service/api";
import { useNavigate } from 'react-router-dom'
import NovoNegocio from "../Components/NovoNegocio";

export default function Adm() {
    const [esperar, setEsperar] = useState(true)
    const navigate = useNavigate()
    const token = localStorage.getItem('token')

    useEffect(() => {
        buscarUser()
    }, [])

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
                <h1>Painel do Administrador</h1>
                <div>
                    <NovoNegocio />
                </div>
            </div>
            }
        </div>
    )
}