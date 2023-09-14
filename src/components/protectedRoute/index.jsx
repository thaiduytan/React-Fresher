import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import NotPermitted from "./NotPermitted";

// compoent check phan quyen` user/admin
const RoleBaseRoute = (props) => {
  const isAdminRole = window.location.pathname.startsWith("/admin");
  const user = useSelector((state) => state.account.user);
  const roleRole = user.role;

  // (isAdminRole && roleRole === "ADMIN")
  // if(!isAdminRole){
  //   console.log("ok");
  // }
  // (isAdminRole && roleRole === "ADMIN") || (!isAdminRole && (roleRole === "ADMIN" ||roleRole === "USER" )
  if (
    (isAdminRole && roleRole === "ADMIN") ||
    (!isAdminRole && (roleRole === "ADMIN" || roleRole === "USER"))
  ) {
    return <>{props.children}</>;
  } else {
    return <NotPermitted />;
  }
};

const ProtectedRoute = ({ children }) => {
  // protected, kiểm tra nếu đã có đăng nhập thì sẽ vào children, nếu chưa thì đã về trang login

  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);
  return (
    <>
      {isAuthenticated === true ? (
        /* sau khi thực hiện protected người dùng chưa đăng nhập, tiếp theo là Phân quyền uuser/admin */
        <RoleBaseRoute>{children}</RoleBaseRoute>
      ) : (
        <Navigate to="/auth/login" replace />
      )}
    </>
  );
};

export default ProtectedRoute;
