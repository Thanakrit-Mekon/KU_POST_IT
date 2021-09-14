import { ReactNode } from "react";
import { Route, Redirect, useHistory, useLocation } from "react-router-dom";

interface PrivateRouteProps {
  children: ReactNode;
  [rest: string]: any;
  isLoading: boolean;
}

function PrivateRoute({ children, isLoading, ...rest }: PrivateRouteProps) {
  const location = useLocation();
  console.log(location);
  const isAuthenticated = localStorage.getItem("accessToken");
  if (isLoading) return null;

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
