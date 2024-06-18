import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function RequireAuth() {
  const { auth, isLogged } = useAuth();
  const location = useLocation();
  return auth?.token && isLogged ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}

export default RequireAuth;
