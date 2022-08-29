import React from "react";
import { useSelector } from 'react-redux'

export default function ListaUnidades() {
    const unidades = useSelector((state) => {
        return state.unidades
    })

    const listUnidades = unidades.map((unidade) => {
        return (
            //Acrescentar uma lógica pra caso a unidade seja nova fazer alguma coisa
            <tr className="item-negocio">
                <td>{unidade.id}</td>
                <td><a href={unidade.link_whatsapp}>{unidade.nome}</a></td>
                <td>{unidade.nome_negocio}</td>
                <td>{unidade.bairro}, {unidade.cidade} {unidade.estado}</td>
                <td>{unidade.valor_proximo_pagamento}</td>
                <td>{unidade.status}</td>
                <td><button>Pagar</button></td>
                <td><button>Conceder multa</button></td>
                <td><button>Inativar</button></td>
                <td><button>Deletar</button></td>
            </tr>
        )
    })
    return (
        <div className="lista-unidades">
            <h2>Lista de unidades</h2>
            {unidades.length > 0 &&
            <table>
                <tr>
                    <th>Id</th>
                    <th>Unidade</th>
                    <th>Negócio</th>
                    <th>Bairro e cidade</th>
                    <th>Valor do Proximo Pagamento</th>
                    <th>Status</th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                </tr>
                {listUnidades}
            </table>
            }
        </div>
    )
}