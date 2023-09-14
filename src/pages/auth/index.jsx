import React from "react";
// import HeaderAuth from "../../components/header/Auth";
// import FooterAuth from "../../components/footer/Auth";
import { Outlet } from "react-router-dom";
import "./index.scss";

const AuthPage = () => {
  return (
    <div className="wrapper-auth">
      <HeaderAuth></HeaderAuth>
      <Outlet></Outlet>
      <FooterAuth></FooterAuth>
    </div>
  );
};

export default AuthPage;
