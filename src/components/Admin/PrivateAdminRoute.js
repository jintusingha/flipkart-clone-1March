import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const PrivateAdminRoute = ({ children }) => {
  const { admin } = useContext(AuthContext);

  return admin ? children : <Navigate to="/admin/login" replace />;
};

export default PrivateAdminRoute;
