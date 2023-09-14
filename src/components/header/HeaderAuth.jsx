import React from "react";
import "./HeaderAuth.scss";
import { Link } from "react-router-dom";

const HeaderAuth = () => {
  return (
    <header className="header-auth">
      <div className="header-logo">
        <span className="">
          <Link to="/">Developer Platform</Link>
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
