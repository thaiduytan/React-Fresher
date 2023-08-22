import React from "react";
import HeaderAuth from "../../components/Header/Auth";
import FooterAuth from "../../components/Footer/Auth";
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
