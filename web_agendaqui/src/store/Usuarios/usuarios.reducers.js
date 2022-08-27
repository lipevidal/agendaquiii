import { createReducer } from '@reduxjs/toolkit'
import { addUsuario, addUsuarios } from './usuarios.actions';

const ESTADO_INICIAL = [];

export default createReducer(ESTADO_INICIAL, {
    [addUsuarios.type]: (state, action) => action.payload,
    [addUsuario.type]: (state, action) => [...state, action.payload]
})