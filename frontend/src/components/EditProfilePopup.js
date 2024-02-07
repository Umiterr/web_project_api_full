// EditProfilePopup.js
import React, { useState, useEffect, useContext } from "react";
import { Popup } from "./Popup/Popup";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

export function EditProfilePopup({ onUpdateUser, isOpen, closePopup }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setNameLocal] = useState("");
  const [about, setAboutLocal] = useState("");

  useEffect(() => {
    if (currentUser) {
      setNameLocal(currentUser.name);
      setAboutLocal(currentUser.about);
    }
  }, [currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser(name, about);
  };

  const handleNameChange = (e) => {
    setNameLocal(e.target.value);
  };

  const handleAboutChange = (e) => {
    setAboutLocal(e.target.value);
  };

  return (
    <Popup
      type="form-profile"
      className="form"
      isOpen={isOpen}
      closePopup={closePopup}
    >
      <PopupWithForm
        type="form-profile"
        onSubmit={handleSubmit}
        title="Editar perfil"
        buttonTitle="Guardar"
      >
        <input
          className="form__input form-profile__name"
          type="text"
          id="name-input"
          name="nombre"
          placeholder="Nombre"
          minLength="2"
          maxLength="40"
          required
          value={name}
          onChange={handleNameChange}
        />
        <span className="form__input-error name-input-error"></span>

        <input
          className="form__input form-profile__about"
          type="text"
          id="about-input"
          name="trabajo"
          placeholder="Acerca de mí"
          minLength="2"
          maxLength="200"
          required
          value={about}
          onChange={handleAboutChange}
        />
        <span className="form__input-error about-input-error">
          Este campo es obligatorio
        </span>
      </PopupWithForm>
    </Popup>
  );
}
