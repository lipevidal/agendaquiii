import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Adm from "../Pages/Adm";
import NaoAutorizado from "../Pages/NaoAutorizado";
import PrivateRoute from "./PrivateRoute";

export default function Rotas() {
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