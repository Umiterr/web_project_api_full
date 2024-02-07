import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Register.css";
import succesIcon from "../images/UI/Succes.svg";
import failIcon from "../images/UI/Fail.svg";

import * as auth from "../utils/auth";
import InfoTooltip from "./InfoTooltip";

const Register = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [message, setMessage] = useState("");
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [stateStatusInfoTooltip, setStateStatusInfoTooltip] = useState(false);
  const navigate = useNavigate();

  const handleChangeRegister = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "contraseña") setContraseña(value);
  };

  const handleSubmitRegister = (e) => {
    e.preventDefault();

    const openInfoTooltip = () => {
      setIsInfoTooltipOpen(true);
    };

    auth.register(contraseña, email).then((res) => {
      console.log("Respuesta:", res);
      if (res?.data?._id && res?.data?.email) {
        openInfoTooltip();
        setStateStatusInfoTooltip(true);
        onLogin();
        setTimeout(() => {
          navigate("/profile");
        }, 3000);

        console.log(res);
      } else if (res && res.error === true) {
        openInfoTooltip();
        setStateStatusInfoTooltip(false);
      }
    });
  };

  const statusTooltip = () => {
    if (stateStatusInfoTooltip) {
      return {
        image: succesIcon,
        message: "¡Correcto! Ya estás registrado.",
        imageAlt: "Signo de confirmación",
      };
    } else {
      return {
        image: failIcon,
        message: "Uy, algo salió mal. Por favor, inténtalo de nuevo.",
        imageAlt: "Signo de fallo",
      };
    }
  };

  const closeInfoTooltip = () => {
    setIsInfoTooltipOpen(false);
  };

  return (
    <div className="register">
      <InfoTooltip
        isOpen={isInfoTooltipOpen}
        closePopup={closeInfoTooltip}
        statusTooltip={statusTooltip}
      ></InfoTooltip>
      <p className="register__welcome">Regístrate.</p>
      <form onSubmit={handleSubmitRegister} className="register__form">
        <input
          className="register_input"
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={handleChangeRegister}
          placeholder="Correo Electrónico:"
        />

        <input
          className="register_input"
          id="contraseña-register"
          name="contraseña"
          type="password"
          value={contraseña}
          onChange={handleChangeRegister}
          placeholder="Contraseña"
        />

        <div className="register__button-container">
          <button type="submit" className="register__link">
            Regístrate
          </button>
        </div>
      </form>
      <div className="register__signin">
        <p>¿Ya tienes una cuenta?</p>
        <Link to="/login" className="register__login-link">
          Inicia sesión aquí
        </Link>
      </div>
    </div>
  );
};

export default Register;
