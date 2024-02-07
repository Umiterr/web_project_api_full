import React, { useState, useEffect } from "react";
import { Popup } from "./Popup/Popup";
import PopupWithForm from "./PopupWithForm";

export function AddPlacePopup({ isOpen, closePopup, onSubmit }) {
  const [isFormValid, setIsFormValid] = useState(false);
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  const [nameErrorVisible, setNameErrorVisible] = useState(false);
  const [urlErrorVisible, setUrlErrorVisible] = useState(false);
  const [nameTouched, setNameTouched] = useState(false);
  const [urlTouched, setUrlTouched] = useState(false);

  const urlRegex =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

  useEffect(() => {
    if (nameTouched || urlTouched) {
      setIsFormValid(urlRegex.test(url) && name.length > 0);
      setNameErrorVisible(name.length === 0);
      setUrlErrorVisible(url && !urlRegex.test(url));
    }
  }, [url, name, nameTouched, urlTouched]);

  const handleNameChange = (e) => {
    setName(e.target.value);
    setNameTouched(true);
  };

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
    setUrlTouched(true);
  };

  return (
    <Popup
      type="form-post"
      className="form"
      isOpen={isOpen}
      closePopup={closePopup}
    >
      <PopupWithForm
        type="form-post"
        onSubmit={onSubmit}
        title="Nuevo lugar"
        buttonTitle="Crear"
        disabled={!isFormValid}
      >
        <input
          className="form__input form-post__name"
          type="text"
          id="post-name-input"
          name="nombre"
          placeholder="Titulo"
          minLength="2"
          maxLength="30"
          onChange={handleNameChange}
          value={name}
          required
        />
        <span
          className={`form__input-error post-name-input-error ${
            nameErrorVisible ? "form__input-error_active" : ""
          }`}
        >
          Por favor ingrese un nombre válido
        </span>
        <input
          className="form__input form-post__url"
          type="url"
          id="url-input"
          name="acerca-de"
          placeholder="URL de la imagen"
          onChange={handleUrlChange}
          value={url}
          required
        />
        <span
          className={`form__input-error url-input-error ${
            urlErrorVisible ? "form__input-error_active" : ""
          }`}
        >
          Por favor ingrese una URL válida
        </span>
      </PopupWithForm>
    </Popup>
  );
}
