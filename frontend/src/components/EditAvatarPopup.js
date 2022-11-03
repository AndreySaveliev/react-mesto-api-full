import React, { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarLink = useRef();

  function handleSubmit(event) {
    event.preventDefault();
    onUpdateAvatar({
      avatar: avatarLink.current.value,
    });
  }

  useEffect(() => {
    avatarLink.current.value = "";
  }, [isOpen]);

  return (
    <PopupWithForm
      onClose={onClose}
      name="change-profile-pic"
      title="Обновить аватар"
      buttonText="Сохранить"
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <div className="popup__change-profile-pic-input">
        <input
          id="profilePicLink"
          type="url"
          name="link"
          className="popup__input popup__input_profile_pic"
          placeholder="Ссылка на аватарку"
          required
          autoComplete="off"
          ref={avatarLink}
        />
        <span className="profilePicLink-error popup__form-input-error"></span>
      </div>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
