import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { Route } from 'react-router-dom';
import { redirect } from "react-router-dom";


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
    const { isAuthenticated, loading, user } = useSelector(state => state.user);

    if (!isAuthenticated) {
        return redirect("/login")
    }

    return children;
}


export default ProtectedRoute