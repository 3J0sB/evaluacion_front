import React from "react";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../store/auth-context.jsx";
import {jwtDecode} from "jwt-decode";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { token } = useContext(AuthContext);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  let userRole = null;
  try {
    const decoded = jwtDecode(token);
    const sub = decoded.sub || "";
    if (sub.includes("ROLE_ADMIN")) userRole = "ADMIN";
    else if (sub.includes("ROLE_USER")) userRole = "USER";
  } catch {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;