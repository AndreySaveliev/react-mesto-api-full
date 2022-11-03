import React, { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  function handleChangeNameInput(event) {
    setName(event.target.value);
  }

  function handleChangeDescriptionInput(event) {
    setDescription(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    onUpdateUser({
      name: name,
      about: description,
    });
  }

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [isOpen]);

  return (
    <PopupWithForm
      onClose={onClose}
      name="profile-edit"
      title="Редактировать профиль"
      buttonText="Сохранить"
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <div className="popup__name-input">
        <input
          id="name"
          name="name"
          className="popup__input popup__input_textbox_name"
          type="text"
          placeholder="Имя"
          minLength="2"
          maxLength="40"
          autoComplete="off"
          value={name || ""}
          onChange={handleChangeNameInput}
        />
        <span className="name-error popup__form-input-error"></span>
      </div>
      <div className="popup__description-input">
        <input
          id="description"
          name="description"
          className="popup__input popup__input_textbox_description"
          type="text"
          placeholder="Описание профиля"
          minLength="2"
          maxLength="200"
          autoComplete="off"
          value={description || ""}
          onChange={handleChangeDescriptionInput}
        />
        <span className="description-error popup__form-input-error"></span>
      </div>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
