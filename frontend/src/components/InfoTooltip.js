import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Popup } from "./Popup/Popup";
import "../styles/InfoTooltip.css";

const InfoTooltip = ({ isOpen, closePopup, statusTooltip }) => {
  const handler = async (event) => {
    event.preventDefault();
    closePopup();
  };

  const image = statusTooltip().image;
  const message = statusTooltip().message;
  const imageAlt = statusTooltip().imageAlt;

  return (
    <div className="InfoTooltip_popup">
      <Popup
        type="InfoTooltip"
        className="form"
        isOpen={isOpen}
        closePopup={closePopup}
      >
        <div className="InfoTooltip_window">
          <img className="InfoTooltip__image" alt={imageAlt} src={image} />
          <h3 className="InfoTooltip_message">{message}</h3>
        </div>
      </Popup>
    </div>
  );
};

export default InfoTooltip;
