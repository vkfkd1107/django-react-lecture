import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAppContext } from "../store";

export default function LoginRequiredRoute({
  component: Component,
  ...kwargs
}) {
  const {
    store: { isAuthenticated },
  } = useAppContext();

  if (isAuthenticated) {
  } else {
  }

  console.log("isAuthenticated: ", isAuthenticated);

  return (
    <Route
      {...kwargs}
      render={(props) => {
        if (isAuthenticated) {
          return <Component {...props} />;
        } else {
          return (
            <Navigate
              to={{
                pathname: "/accounts/login",
                state: { from: props.location },
              }}
            />
          );
        }
      }}
    />
  );
}
