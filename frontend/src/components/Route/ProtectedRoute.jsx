import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { Route } from 'react-router-dom';
import { Navigate } from "react-router-dom";


/*
const ProtectedRoute = ({ element: element, ...rest }) => {

    const { isAuthenticated, loading, user } = useSelector(state => state.user);

    return (
        <Fragment>
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
        </Fragment>
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