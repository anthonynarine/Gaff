import { Navigate } from "react-router-dom";
import { useAuthContext } from "../components/context/AuthContext";

import React from "react";
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn } = useAuthContext();
  if (!isLoggedIn) {
    return <Navigate to="/login" replace={true} />;
  } else {
    return <>{children}</>;
  }
};

export default ProtectedRoute;
