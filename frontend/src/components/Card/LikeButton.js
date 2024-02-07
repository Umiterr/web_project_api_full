import { useEffect, useState } from "react";
import api from "../../utils/api";
import filledHeartIcon from "../../images/UI/Heart-Black.svg";
import emptyHeartIcon from "../../images/UI/Heart-White.svg";

export function LikeButton({ cardId, likes, alreadyLiked }) {
  const [isLiked, setIsLiked] = useState(alreadyLiked);

  useEffect(() => {
    setIsLiked(alreadyLiked);
  }, [alreadyLiked]);

  async function like() {
    try {
      if (isLiked) {
        await api.removeLike(cardId);
      } else {
        await api.setLike(cardId);
      }

      setIsLiked(!isLiked);
    } catch (error) {
      console.error("Error al manejar el like:", error);
    }
  }

  return (
    <button className="feed__heart-button" onClick={like}>
      <img
        className="feed__heart-image"
        id="feed__heart-image"
        alt={isLiked ? "Corazón con me gusta" : "Corazón sin me gusta"}
        src={isLiked ? filledHeartIcon : emptyHeartIcon}
      />
      <span className="feed__heart-likes">
        {likes.length - alreadyLiked + isLiked}
      </span>
    </button>
  );
}
