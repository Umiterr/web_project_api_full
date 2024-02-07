import React from "react";
import { Popup } from "./Popup/Popup";

export function ImagePopup({ title, imageUrl, isOpen, closePopup }) {
  return (
    <Popup type="image-popup" isOpen={isOpen} closePopup={closePopup}>
      <img className="image-popup__image" alt={title} src={imageUrl} />
      <h4 className="image-popup__title">{title}</h4>
    </Popup>
  );
}
