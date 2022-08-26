import React from "react";
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({Component}) {
    const isLogged = !!localStorage.getItem('token')
    return isLogged ? <Component/> : <Navigate to="/login"/>
}