import React from "react";
import { useContext } from "react";
import editProfileIcon from "../../images/UI/Edit-Profile-Icon.svg";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export function ProfileImage({ onEditAvatar }) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <div className="profile__image_container">
      <button className="profile__edit-image-button" onClick={onEditAvatar}>
        <img
          className="profile__edit-icon"
          id="profile-edit-icon"
          alt="Icono de editar imagen"
          src={editProfileIcon}
        />
      </button>
      <img
        className="profile__image"
        id="profile-image"
        alt="Imagen de perfil"
        src={currentUser.avatar}
      />
    </div>
  );
}
