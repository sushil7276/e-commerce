import React, { Fragment } from "react";
import { useSelector } from 'react-redux'
// import { Navigate } from "react-router-dom";
import { Redirect, Route } from "react-router-dom";

/*
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
*/


// This is Old version of protected route in react dom V5
const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {
    const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  
    return (
      <Fragment>
        {loading === false && (
          <Route
            {...rest}
            render={(props) => {
              if (isAuthenticated === false) {
                return <Redirect to="/login" />;
              }
  
              if (isAdmin === true && user.role !== "admin") {
                return <Redirect to="/login" />;
              }
  
              return <Component {...props} />;
            }}
          />
        )}
      </Fragment>
    );
  };


export default ProtectedRoute