import React from "react";
import HeaderAuth from "../../components/header/HeaderAuth";
import FooterAuth from "../../components/footer/FooterAuth";
import { Outlet } from "react-router-dom";
import "./index.scss";

const AuthPage = () => {
  return (
    <div className="wrapper-auth">
      <HeaderAuth />
      <Outlet></Outlet>
      <FooterAuth />
    </div>
  );
};

export default AuthPage;
