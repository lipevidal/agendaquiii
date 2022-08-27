import { createReducer } from '@reduxjs/toolkit'
import { addNegocio, addNegocios } from './negocios.actions';

const ESTADO_INICIAL = [];

export default createReducer(ESTADO_INICIAL, {
    [addNegocios.type]: (state, action) => action.payload,
    [addNegocio.type]: (state, action) => [...state, action.payload]
})