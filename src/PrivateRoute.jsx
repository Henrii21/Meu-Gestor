import React from "react";
import { Navigate } from "react-router-dom";
import { getToken } from "./services/auth";

export default function PrivateRoute({ children }) {
  const token = getToken();
  return token ? children : <Navigate to="/login" replace />;
}
