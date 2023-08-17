import React from "react";
import "./Auth.scss";
import { Link } from "react-router-dom";

const HeaderAuth = () => {
  return (
    <header className="header-auth">
      <div className="header-logo">
        <span className="">
          <a href="#">Developer Platform</a>
        </span>
      </div>
      <div className="header-nav">
        <Link to="/auth/login">Đăng nhập</Link>
        <Link to="/auth/register">Đăng ký</Link>
      </div>
    </header>
  );
};

export default HeaderAuth;
