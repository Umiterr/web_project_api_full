import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.css";
import * as auth from "../utils/auth";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChangeLogin = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "contraseña") setContraseña(value);
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();

    if (!email || !contraseña) {
      return;
    }

    try {
      const data = await auth.login(contraseña, email);

      if (data.token) {
        setEmail("");
        setContraseña("");

        navigate("/profile");

        onLogin();
      }
    } catch (error) {
      console.error("Error durante la autenticación:", error.message);
    }
  };

  const tokenCheck = () => {
    const jwt = localStorage.getItem("jwt");

    if (jwt) {
      auth.getContent(jwt).then((res) => {
        if (res) {
          console.log(res);
          onLogin();
          navigate("/profile");
        }
      });
    }
  };

  tokenCheck();
  return (
    <div className="login">
      <p className="login__welcome">Inicia sesión</p>
      <form onSubmit={handleSubmitLogin} className="login__form">
        <input
          className="login__input"
          required
          id="email"
          name="email"
          type="text"
          value={email}
          onChange={handleChangeLogin}
          placeholder="Correo electrónico"
        />

        <input
          className="login__input"
          required
          id="contraseña-login"
          name="contraseña"
          type="password"
          value={contraseña}
          onChange={handleChangeLogin}
          placeholder="Contraseña"
        />
        <div className="login__button-container">
          <button type="submit" className="login__link">
            Inicia sesión
          </button>
        </div>
      </form>
      <div className="login__signup">
        <p>¿Aún no eres miembro?</p>
        <Link to="/register" className="signup__link">
          Regístrate aquí
        </Link>
      </div>
    </div>
  );
};

export default Login;
