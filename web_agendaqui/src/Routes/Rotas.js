import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from "../Pages/Home";
import Login from "../Pages/Login";

export default function Rotas() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Home/>}/>
                <Route exact path="/login" element={<Login/>}/>
            </Routes>
        </BrowserRouter>
    )
}