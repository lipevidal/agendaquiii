import React, { useState } from "react";
import { useSelector } from 'react-redux'
import NovoNegocio from "./NovoNegocio";
import EditarNegocio from "./EditarNegocio";

export default function ListaNegocios() {
    const [idNegocio, setIdNegocio] = useState()
    const [paginas, setPaginas] = useState({
        listaNegocio: true,
        novoNegocio: false,
        editarNegocio: false
    })
    const negocios = useSelector((state) => {
        return state.negocios
    })
    const botaoEditar = (id) => {
        setIdNegocio(id)
        console.log(idNegocio)
        setPaginas({...paginas, listaNegocio: false, editarNegocio: true})
    }
    console.log(negocios)

    const listNegocios = negocios.map((negocio) => {
        return (
            <tr className="item-negocio">
                <td>{negocio.nome}</td>
                <td>{negocio.pagina}</td>
                <td>{negocio.tipo}</td>
                <td><button onClick={() => botaoEditar(negocio.id)}>Editar</button></td>
            </tr>
        )
    })
    return (
        <div>
            {paginas.listaNegocio &&
                <div className="lista-negocios">
                    <h1>Lista de negócios</h1>
                    <button onClick={() => setPaginas({...paginas, listaNegocio: false, novoNegocio: true})}>
                        + Novo negócio
                    </button>
                    <table>
                        <tr>
                            <th>Nome do negócio</th>
                            <th>Nome único</th>
                            <th>Tipo</th>
                            <th></th>
                        </tr>
                        {listNegocios}
                    </table>
                </div>
            }
            {paginas.novoNegocio &&
                <NovoNegocio />
            }
            {paginas.editarNegocio &&
                <EditarNegocio 
                    idDoNegocio={idNegocio}
                />
            }
        </div>
    )
}