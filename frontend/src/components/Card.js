import React from "react";
import { useContext } from "react";
import { LikeButton } from "./Card/LikeButton";
import { TrashButton } from "./Card/TrashButton";
import CurrentUserContext from "../contexts/CurrentUserContext";

export function Card({ card, onCardClicked, openPopupConfirm }) {
  const { _id, name, likes, link, owner } = card;

  const currentUser = useContext(CurrentUserContext);
  const clientUserId = currentUser._id;
  const isOwned = clientUserId === owner._id;

  return (
    <div className="feed__post">
      {isOwned && (
        <TrashButton cardId={_id} openPopupConfirm={openPopupConfirm} />
      )}
      <button className="feed__image-popup-buttom" onClick={onCardClicked}>
        <img className="feed__image" alt={name} src={link} />
      </button>
      <h3 className="feed__title">{name}</h3>
      <LikeButton
        likes={likes}
        cardId={_id}
        alreadyLiked={likes.some((like) => like._id === clientUserId)}
      />
    </div>
  );
}
