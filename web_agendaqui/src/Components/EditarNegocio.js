import React from "react";

export default function EditarNegocio(props) {
    const idNegocio = props.idDoNegocio
    return (
        <div>
            <h1>Editar Negócio</h1>
            <div>{idNegocio}</div>
        </div>
    )
}