import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // protected, kiểm tra nếu đã có đăng nhập thì sẽ vào children, nếu chưa thì đã về trang login

  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);
  return (
    <>
      {isAuthenticated === true ? (
        <>{children}</>
      ) : (
        <Navigate to="/auth/login" replace />
      )}
    </>
  );
};

export default ProtectedRoute;
