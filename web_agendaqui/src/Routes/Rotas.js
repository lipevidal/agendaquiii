import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addNegocios } from '../store/Negocios/negocios.actions'
import { addUnidades } from '../store/Unidades/unidades.actions'
import { addUsuarios } from '../store/Usuarios/usuarios.actions'
import api from "../service/api";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Adm from "../Pages/Adm";
import NaoAutorizado from "../Pages/NaoAutorizado";
import PrivateRoute from "./PrivateRoute";

export default function Rotas() {
    const token = localStorage.getItem('token')
    const dispatch = useDispatch()

    useEffect(() => {
        if(token) {
            buscarNegocios()
            buscarUnidades()
            buscarUsuarios()
        } else {
            console.log('Token não existe, não faço requisição')
        }
    }, [])

    const buscarNegocios = () => {
        api.get('/api/v1/negocio', {
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            console.log(res.data)
            dispatch(addNegocios(res.data))
        }).catch((err) => {
            console.log(err)
        })
    }

    const buscarUnidades = () => {
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
    }

    const buscarUsuarios = () => {
        api.get('/api/v1/user', {
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            console.log(res.data)
            dispatch(addUsuarios(res.data))
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Home/>}/>
                <Route exact path="/login" element={<Login/>}/>
                <Route exact path="/erro" element={<NaoAutorizado/>}/>
                <Route exact path="/adm" element={<PrivateRoute Component={Adm}/>}/>
            </Routes>
        </BrowserRouter>
    )
}