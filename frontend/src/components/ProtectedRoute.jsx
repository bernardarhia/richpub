import React,{useContext} from "react";
import { Route, Redirect } from "react-router-dom";
import {UserContext} from "../context/UserContext"
const ProtectedRoute = ({ component: Component, isAuth,...rest }) => {

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuth) return <Component {...props} />;
        else
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location,
                },
              }}
            />
          );
      }}
    ></Route>
  );
};

export default ProtectedRoute;
