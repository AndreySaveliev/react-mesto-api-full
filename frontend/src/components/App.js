import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import ImagePopup from "./ImagePopup.js";
import EditProfilePopup from "./EditProfilePopup.js";
import { bid } from "../utils/Api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import DeleteCardPopup from "./DeleteCardPopup.js";
import Register from "./Register.js";
import Login from "./Login.js";
import ProtectedRoute from "./ProtectedRoute.js";
import { auth } from "../utils/AuthApi.js";
import InfoToolTip from "./InfoToolTip.js";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setDeleteCardPopupOpen] = useState(false);
  const [isInfoToolTipOpen, setInfoToolTipOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState("");
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [err, setErr] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const nav = useNavigate();

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }
  function handleDeleteCardClick() {
    setDeleteCardPopupOpen(true);
  }
  function handleOpenInfoTip() {
    setInfoToolTipOpen(true);
  }
  function handleSetLog() {
    setLoggedIn(true);
  }
  function handleSetErr() {
    setErr(true);
  }

  function closeAllPopups(e) {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setDeleteCardPopupOpen(false);
    setInfoToolTipOpen(false);
    setErr(false);
    setSelectedCard({});
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleUpdateUser(info) {
    bid
      .saveUserData(info.name, info.about)
      .then((res) => {
        setCurrentUser(res.data);
        closeAllPopups();
      })
      .catch((error) =>
        console.log("Ошибка! Не удалось обновить данные пользователя")
      );
  }

  function handleUpdateAvatar(info) {
    bid
      .changeProfilePic(info.avatar)
      .then((res) => {
        currentUser.avatar = res.data.avatar;
        closeAllPopups();
      })
      .catch((error) =>
        console.log("Ошибка! Не удалось обновить аватар пользователя")
      );
  }

  function handleClickLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    if (!isLiked) {
      bid
        .like(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard.data : c))
          );
        })
        .catch((error) => console.log("Ошибка! Не удалось отправить запрос"));
    } else {
      bid
        .unlike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard.data : c))
          );
        })
        .catch((error) => console.log("Ошибка! Не удалось отправить запрос"));
    }
  }
  function handleCardDelete(id) {
    bid
      .deleteCard(id)
      .then(() => {
        const newCards = cards.filter((cardInArr) => cardInArr._id !== id);
        setCards((cards) => {
          return newCards;
        });
        closeAllPopups();
      })
      .catch((error) => console.log("Ошибка! Не удалось удалить карточку"));
  }

  function handleAddPlaceSubmit(card) {
    bid
      .postCard(card.name, card.link)
      .then((newCard) => {
        setCards([...cards, newCard.data]);
        closeAllPopups();
      })
      .catch((error) => console.log(error, "Ошибка! Не удалось создать карточку"));
  }

  function handleSetLoggedIn(data) {
    setUserEmail(data);
    handleSetLog();
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
  
      auth
        .checkMe(token)
        .then((res) => {
          setUserEmail(res.data.email);
          setLoggedIn(true);
          nav("/");
        })
        .catch((error) => console.log(error));
    }
  }, [nav]);

  useEffect(() => {
    if (!loggedIn) {
      return;
    }
    bid
      .getInitialCards()
      .then((res) => {
        setCards(...cards, res.data);
      })
      .catch((error) => console.log("Ошибка! Не удалось загрузить карточки"));

    bid
      .getUser()
      .then((res) => {
        setCurrentUser(res.data);
      })
      .catch((error) =>
        console.log("Ошибка! Не удалось загрузить данные пользователя")
      );
  }, [loggedIn]);

  return (
    <div className="page">
      <InfoToolTip
        isOpen={isInfoToolTipOpen}
        onClose={closeAllPopups}
        isError={err}
      />
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute isLogged={loggedIn}>
                <Header email={userEmail} />
                <Main
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  onCardDeleteClick={handleDeleteCardClick}
                  onCardLike={handleClickLike}
                  cards={cards}
                />
                <Footer />
                <EditProfilePopup
                  isOpen={isEditProfilePopupOpen}
                  onClose={closeAllPopups}
                  onUpdateUser={handleUpdateUser}
                />
                <EditAvatarPopup
                  isOpen={isEditAvatarPopupOpen}
                  onClose={closeAllPopups}
                  onUpdateAvatar={handleUpdateAvatar}
                ></EditAvatarPopup>
                <AddPlacePopup
                  isOpen={isAddPlacePopupOpen}
                  onClose={closeAllPopups}
                  onAddPlace={handleAddPlaceSubmit}
                ></AddPlacePopup>
                <DeleteCardPopup
                  isOpen={isDeleteCardPopupOpen}
                  onClose={closeAllPopups}
                  onCardDelete={handleCardDelete}
                  card={selectedCard}
                ></DeleteCardPopup>
                <ImagePopup
                  onClose={closeAllPopups}
                  card={selectedCard}
                ></ImagePopup>
              </ProtectedRoute>
            }
          />
          <Route
            path="/signin"
            element={
              <Login
                onSignin={handleSetLoggedIn}
                onError={handleSetErr}
                onOpenTip={handleOpenInfoTip}
                onClose={closeAllPopups}
              />
            }
          />
          <Route
            path="/signup"
            element={
              <Register
                handleSetLoggedIn={handleSetLoggedIn}
                onOpenTip={handleOpenInfoTip}
                onClose={closeAllPopups}
                onError={handleSetErr}
              />
            }
          />
        </Routes>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
