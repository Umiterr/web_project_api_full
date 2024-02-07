import React from "react";
import { useContext } from "react";
import editIcon from "../../images/UI/Edit-Button.svg";
import { ProfileImage } from "./ProfileImage";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export function Profile({ onEditProfile, onEditAvatar }) {
  const currentUser = useContext(CurrentUserContext);
  if (!currentUser) return <p>Loading...</p>;

  const { name, about } = currentUser;

  return (
    <div className="profile">
      <ProfileImage onEditAvatar={onEditAvatar} />
      <div className="profile__info">
        <h2 className="profile__info-name">{name}</h2>
        <h3 className="profile__about">{about}</h3>
      </div>

      <button className="profile__edit-button" onClick={onEditProfile}>
        <img
          id="profile__edit-button"
          alt="Boton de editar perfil"
          src={editIcon}
        />
      </button>
    </div>
  );
}
