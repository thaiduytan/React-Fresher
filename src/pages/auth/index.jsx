import React from "react";
// import HeaderAuth from "../../components/header/Auth";
// import FooterAuth from "../../components/footer/Auth";
import { Outlet } from "react-router-dom";
import "./index.scss";
import HeaderAuth from "./../../components/Header/Auth";
import FooterAuth from "./../../components/Footer/Auth";

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
