import React from "react";
import { Popup } from "./Popup/Popup";
import PopupWithForm from "./PopupWithForm";

export function PopupConfirm({ deleteSelectedCard, isOpen, closePopup }) {
  const handler = async (event) => {
    event.preventDefault();
    await deleteSelectedCard();
    closePopup();
  };

  return (
    <Popup
      type="form-confirm"
      className="form"
      isOpen={isOpen}
      closePopup={closePopup}
    >
      <PopupWithForm
        type="form-confirm"
        onSubmit={() => {}}
        title="¿Estás seguro?"
        buttonTitle="Si"
        handler={handler}
      ></PopupWithForm>
    </Popup>
  );
}
