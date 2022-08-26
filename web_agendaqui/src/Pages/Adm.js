import React, { useEffect } from "react";
import api from "../service/api";
import { useNavigate } from 'react-router-dom'

export default function Adm() {
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
        })
    }

    return (
        <div>Página do administrador</div>
    )
}