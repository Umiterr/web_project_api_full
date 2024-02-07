import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/HeaderButton.css";
import * as auth from "../utils/auth";

const HeaderButton = () => {
  const [email, setEmail] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");

    if (jwt) {
      auth.getContent(jwt).then((res) => {
        if (res?.data?.email) {
          setEmail(res?.data?.email);
        } else {
          setEmail("");
        }
      });
    }
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("jwt");
  };
  const goLogin = () => {
    navigate("/login");
  };

  const goRegister = () => {
    navigate("/register");
  };

  const getInfo = () => {
    switch (location.pathname) {
      case "/profile":
        return {
          text: "Cerrar sesión",
          account: email,
          onClick: () => {
            handleLogout();
            goLogin();
          },
        };
      case "/register":
        return {
          text: "Iniciar sesión",
          onClick: () => {
            handleLogout();
            goLogin();
          },
        };
      case "/login":
        return {
          text: "Regístrate",
          link: "/register",
          onClick: () => {
            handleLogout();
            goRegister();
          },
        };
      default:
        return { text: "Texto Predeterminado", link: "/" };
    }
  };
  const { text, account, onClick } = getInfo();

  return (
    <div className="HeaderButton">
      <button className="HeaderButton_button" onClick={onClick}>
        {account && <span className="HeaderButton_email">{account}</span>}
        {text}
      </button>
    </div>
  );
};

export default HeaderButton;
