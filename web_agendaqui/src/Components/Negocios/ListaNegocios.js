import React, { useState } from "react";
import { useSelector } from 'react-redux'
import NovoNegocio from "./NovoNegocio";
import EditarNegocio from "./EditarNegocio";

export default function ListaNegocios() {
    const [idNegocio, setIdNegocio] = useState()
    const [busca, setBusca] = useState(''.toLowerCase())
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

    const voltarTelaLista = () => {
        setPaginas({listaNegocio: true, novoNegocio: false, editarNegocio: false})
    }

    const negociosFiltrados = negocios.filter((negocio) => {
        return negocio.nome.toLowerCase().includes(busca)
    })

    const listNegocios = negociosFiltrados.map((negocio) => {
        return (
            <tr className="item-negocio">
                <td>{negocio.id}</td>
                <td>{negocio.nome}</td>
                <td>{negocio.pagina}</td>
                <td>{negocio.tipo}</td>
                <td><button onClick={() => botaoEditar(negocio.id)}>Ver</button></td>
            </tr>
        )
    })

    return (
        <div>
            {paginas.listaNegocio &&
                <div className="lista-negocios">
                    <h2>Lista de negócios</h2>

                    <button onClick={() => setPaginas({...paginas, listaNegocio: false, novoNegocio: true})}>
                        + Novo negócio
                    </button>

                    <input 
                        type="text"
                        placeholder="Buscar negocios"
                        value={busca}
                        onChange={(e) => setBusca(e.target.value)}
                    />

                    {negocios.length > 0 &&
                    <table>
                        <tr>
                            <th>Id</th>
                            <th>Nome do negócio</th>
                            <th>Nome único</th>
                            <th>Tipo</th>
                            <th></th>
                        </tr>
                        {listNegocios}
                    </table>
                    }
                </div>
            }
            {paginas.novoNegocio &&
                <NovoNegocio 
                    voltar={voltarTelaLista}
                />
            }
            {paginas.editarNegocio &&
                <EditarNegocio 
                    idDoNegocio={idNegocio}
                    voltar={voltarTelaLista}
                />
            }
        </div>
    )
}