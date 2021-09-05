import { ReactNode } from "react";
import { Route, Redirect } from "react-router-dom";

interface PrivateRouteProps {
  children: ReactNode;
  [rest: string]: any;
}

function PrivateRoute({
  children,
  isAuthenticated,
  ...rest
}: PrivateRouteProps) {
  console.log(isAuthenticated);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
