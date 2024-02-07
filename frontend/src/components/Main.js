import addIcon from "../images/UI/Add-Button.svg";
import { useContext } from "react";
import { Card } from "./Card";
import api from "../utils/api";
import { Profile } from "./Profile/Profile";
import { ImagePopup } from "./ImagePopup";
import { PopupConfirm } from "./PopupConfirm";
import { AddPlacePopup } from "./AddPlacePopup";
import { EditAvatarPopup } from "./EditAvatarPopup";
import { EditProfilePopup } from "./EditProfilePopup";
import CurrentUserContext from "../contexts/CurrentUserContext";
import { FormValidator } from "../utils/FormValidator";

export function Main(props) {
  const {
    user,
    cards,
    isImagePopupOpen,
    isPopupConfirmOpen,
    selectedCard,
    isAddPlacePopupOpen,
    isEditProfilePopupOpen,
    isEditAvatarPopupOpen,
    closeImagePopup,
    closePopupConfirm,
    onAddCard,
    onEditAvatarClick,
    onEditProfileClick,
    deleteSelectedCard,
    handleUpdateUser,
    handleUpdateAvatar,
    setCards,
    setSelectedCard,
    setIsImagePopupOpen,
    setIsPopupConfirmOpen,
    setIsAddPlacePopupOpen,
    setIsEditProfilePopupOpen,
    setIsEditAvatarPopupOpen,
  } = props;

  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="dashboard">
        <Profile
          onEditAvatar={onEditAvatarClick}
          onEditProfile={onEditProfileClick}
        />

        <button className="card__add-button" onClick={onAddCard}>
          <img
            id="card__add-button"
            alt="Boton de añadir tarjeta"
            src={addIcon}
          />
        </button>
      </section>

      <section className="feed">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClicked={() => {
              setSelectedCard(card);
              setIsImagePopupOpen(true);
            }}
            openPopupConfirm={(cardId) => {
              setSelectedCard(cards.find((card) => card._id === cardId));
              setIsPopupConfirmOpen(true);
            }}
          />
        ))}
      </section>
      <EditProfilePopup
        onUpdateUser={handleUpdateUser}
        isOpen={isEditProfilePopupOpen}
        closePopup={() => {
          setIsEditProfilePopupOpen(false);
        }}
        name={user ? user.name : ""}
        about={user ? user.about : ""}
      />

      <EditAvatarPopup
        onSubmit={handleUpdateAvatar}
        isOpen={isEditAvatarPopupOpen}
        closePopup={() => {
          setIsEditAvatarPopupOpen(false);
        }}
      />

      <AddPlacePopup
        onSubmit={async (e) => {
          e.preventDefault();
          const title = e.target[0].value;
          const imageURL = e.target[1].value;

          const newCard = await api.setNewCard({
            title,
            imageURL,
          });
          setCards([newCard, ...cards]);
          setIsAddPlacePopupOpen(false);
        }}
        isOpen={isAddPlacePopupOpen}
        closePopup={() => {
          setIsAddPlacePopupOpen(false);
        }}
      />

      <PopupConfirm
        deleteSelectedCard={deleteSelectedCard}
        isOpen={isPopupConfirmOpen}
        closePopup={closePopupConfirm}
      />
      <ImagePopup
        title={selectedCard ? selectedCard.name : ""}
        imageUrl={selectedCard ? selectedCard.link : ""}
        isOpen={isImagePopupOpen}
        closePopup={closeImagePopup}
      />
    </main>
  );
}
