import { configureStore } from '@reduxjs/toolkit'
import negociosReducer from './Negocios/negocios.reducers'
import unidadesReducer from './Unidades/unidades.reducers'
import usuariosReducer from './Usuarios/usuarios.reducers'

export default configureStore({
    reducer: {
        negocios: negociosReducer,
        unidades: unidadesReducer,
        usuarios: usuariosReducer
    }
})