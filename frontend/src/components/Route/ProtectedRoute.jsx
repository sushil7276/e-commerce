import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from "react-router-dom";


/*
import { Route } from 'react-router-dom';
const ProtectedRoute = ({ element: element, ...rest }) => {

    const { isAuthenticated, loading, user } = useSelector(state => state.user);

    return (
        <>
            {!loading && (
                <Route
                    {...rest}
                    render={(props) => {
                        if (!isAuthenticated) {
                            return redirect("/login")
                        }
                        return <element {...props} />;
                    }}
                />
            )}
        </>
    )
}

export default ProtectedRoute
*/


// This is new version of protected route in react dom V6
function ProtectedRoute({ children }) {
    const { isAuthenticated, user } = useSelector(state => state.user);

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    return children;
}


export default ProtectedRoute