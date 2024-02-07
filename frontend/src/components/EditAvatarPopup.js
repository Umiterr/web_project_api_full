import React, { useState, useEffect, useRef } from "react";
import { Popup } from "./Popup/Popup";
import PopupWithForm from "./PopupWithForm";

export function EditAvatarPopup({ isOpen, closePopup, onSubmit }) {
  const imageInput = useRef();
  const [isFormValid, setIsFormValid] = useState(false);
  const [url, setUrl] = useState("");
  const [urlErrorVisible, setUrlErrorVisible] = useState(false);
  const [urlTouched, setUrlTouched] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(imageInput?.current.value);
  };

  const urlRegex =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

  useEffect(() => {
    if (urlTouched) {
      setIsFormValid(urlRegex.test(url) && url.length > 0); // Fixed 'name' to 'url'
      setUrlErrorVisible(urlTouched && !urlRegex.test(url)); // Removed url && from condition
    }
  }, [url, urlTouched]);

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
    setUrlTouched(true);
  };

  return (
    <Popup
      type="form-image-profile"
      className="form"
      isOpen={isOpen}
      closePopup={closePopup}
    >
      <PopupWithForm
        type="form-image-profile"
        onSubmit={handleSubmit}
        title="¿Cambiar foto de perfil"
        buttonTitle="Guardar"
      >
        <input
          className="form__input form-image-profile__url"
          type="url"
          id="url-profile-image-input"
          name="profileImageUrl"
          placeholder="URL de la imagen"
          onChange={handleUrlChange} // Fixed function name from handleNameChange to handleUrlChange
          required
          ref={imageInput}
        />
        <span
          className={`form__input-error url-profile-image-input-error ${
            urlErrorVisible ? "form__input-error_active" : ""
          }`}
        >
          ingrese una URL válida
        </span>
      </PopupWithForm>
    </Popup>
  );
}
