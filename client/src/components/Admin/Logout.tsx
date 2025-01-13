import React from 'react'
import { Navigate, redirect } from 'react-router-dom';

function Logout() {
    localStorage.clear();
    return <Navigate to={'/'}/>;
}

export default Logout