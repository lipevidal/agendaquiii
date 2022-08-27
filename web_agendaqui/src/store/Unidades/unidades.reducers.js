import { createReducer } from '@reduxjs/toolkit'
import { addUnidade, addUnidades } from './unidades.actions';

const ESTADO_INICIAL = [];

export default createReducer(ESTADO_INICIAL, {
    [addUnidades.type]: (state, action) => action.payload,
    [addUnidade.type]: (state, action) => [...state, action.payload]
})