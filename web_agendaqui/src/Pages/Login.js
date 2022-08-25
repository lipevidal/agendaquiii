import React from "react";

export default function Login() {
    return (
        <div className="login">
            <h1>Entrar</h1>
            <div className="form">
                <input placeholder="telefone"/>
                <input placeholder="senha"/>
                <button>Entrar</button>
            </div>
        </div>
    )
}