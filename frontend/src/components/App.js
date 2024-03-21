import React, { useEffect, useState } from "react";
import {
  Route,
  Routes,
  BrowserRouter as Router,
  Navigate,
} from "react-router-dom";

import "../App.css";
import CurrentUserContext from "../contexts/CurrentUserContext";
import api from "../utils/api";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Main } from "./Main";
import Login from "./Login";
import Register from "./Register";
import HeaderButton from "./HeaderButton";
import * as auth from "../utils/auth";
import ProtectedRoute from "./ProtectedRoute";

export function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [user, setUser] = useState(null);
  const [cards, setCards] = useState([]);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isPopupConfirmOpen, setIsPopupConfirmOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  const Navigate = useNavigate();
  const currentPath = window.location.pathname;

  const shouldShowHeader = () => {
    return currentPath !== "/tienda" && currentPath !== "/profile";
  };

  const fetchUserData = async () => {
    try {
      const userInfo = await api.getUserInfo();
      setCurrentUser(userInfo);
      setLoggedIn(true);
    } catch (error) {
      console.error("Error fetching current user data:", error);
      setLoggedIn(false);
    }
  };

  useEffect(() => {
    try {
      api.getUserInfo().then((userInfo) => {
        setCurrentUser(userInfo);
      });

      api.getInitialCards().then((cards) => {
        setCards(cards);
      });
    } catch (error) {
      console.error("Error fetching current user data:", error);
    }
  }, []);

  const closeImagePopup = () => {
    setIsImagePopupOpen(false);
  };

  const closePopupConfirm = () => {
    setIsPopupConfirmOpen(false);
  };

  const onAddCard = () => {
    setIsAddPlacePopupOpen(true);
  };

  const onEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const onEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const deleteSelectedCard = async () => {
    const cardId = selectedCard._id;
    setCards(cards.filter((card) => card._id !== cardId));
    await api.deleteCard(cardId);
  };

  const handleUpdateUser = async (name, about) => {
    const newUser = await api.setUserInfo({ name, about });
    setUser(newUser);
    setCurrentUser(newUser);
    setIsEditProfilePopupOpen(false);
  };

  const handleUpdateAvatar = async (e) => {
    const profileImageUrl = e;
    const newUser = await api.setUserImage(profileImageUrl);
    setUser(newUser);
    setCurrentUser(newUser);
    setIsEditAvatarPopupOpen(false);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Router>
        <div className="page__content">
          <Header element={HeaderButton} />

          <Routes>
            <Route
              path="/register"
              element={<Register onLogin={fetchUserData} />}
            />
            <Route path="/login" element={<Login onLogin={fetchUserData} />} />
            <Route
              path="/"
              element={
                loggedIn ? (
                  <Navigate to="/profile" replace />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute
                  loggedIn={loggedIn}
                  children={
                    <Main
                      user={user}
                      cards={cards}
                      isImagePopupOpen={isImagePopupOpen}
                      isPopupConfirmOpen={isPopupConfirmOpen}
                      selectedCard={selectedCard}
                      isAddPlacePopupOpen={isAddPlacePopupOpen}
                      isEditProfilePopupOpen={isEditProfilePopupOpen}
                      isEditAvatarPopupOpen={isEditAvatarPopupOpen}
                      closeImagePopup={closeImagePopup}
                      closePopupConfirm={closePopupConfirm}
                      onAddCard={onAddCard}
                      onEditAvatarClick={onEditAvatarClick}
                      onEditProfileClick={onEditProfileClick}
                      deleteSelectedCard={deleteSelectedCard}
                      handleUpdateUser={handleUpdateUser}
                      handleUpdateAvatar={handleUpdateAvatar}
                      setUser={setUser}
                      setCards={setCards}
                      setSelectedCard={setSelectedCard}
                      setIsImagePopupOpen={setIsImagePopupOpen}
                      setIsPopupConfirmOpen={setIsPopupConfirmOpen}
                      setIsAddPlacePopupOpen={setIsAddPlacePopupOpen}
                      setIsEditProfilePopupOpen={setIsEditProfilePopupOpen}
                      setIsEditAvatarPopupOpen={setIsEditAvatarPopupOpen}
                    />
                  }
                ></ProtectedRoute>
              }
            />
          </Routes>

          <Footer />
        </div>
      </Router>
    </CurrentUserContext.Provider>
  );
}
