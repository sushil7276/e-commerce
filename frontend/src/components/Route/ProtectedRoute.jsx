import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from "react-router-dom";


// This is new version of protected route in react dom V6
function ProtectedRoute({ children, isAdmin }) {
    const { isAuthenticated, user } = useSelector(state => state.user);

    if (isAuthenticated === false) {
        return <Navigate to="/login" replace />
    }


    if (isAdmin === true && user.role !== "admin") {
        return <Navigate to="/login" replace />
    }

    return children;
}


export default ProtectedRoute