import React from "react";
import trashIcon from "../../images/UI/Trash.svg";

export function TrashButton({ cardId, openPopupConfirm }) {
  const handler = () => {
    openPopupConfirm(cardId);
  };
  return (
    <button className="feed__trash-button" onClick={handler}>
      <img
        className="feed__trash-image"
        id="feed__trash-image"
        alt="Icono de basura"
        src={trashIcon}
      />
    </button>
  );
}
