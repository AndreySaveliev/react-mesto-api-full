import PopupWithForm from "./PopupWithForm";
import { useEffect, useState } from "react";
function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  function handleChangeNameInput(event) {
    setName(event.target.value);
  }

  function handleChangeLinkInput(event) {
    setLink(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    onAddPlace({
      name,
      link,
    });
  }

  useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  return (
    <PopupWithForm
      onClose={onClose}
      name="card-add"
      title="Новое место"
      buttonText="Создать"
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <div className="popup__card-name-input">
        <input
          id="cardname"
          type="text"
          name="name"
          className="popup__input popup__input_card_name"
          placeholder="Название"
          required
          minLength="2"
          maxLength="30"
          autoComplete="off"
          value={name}
          onChange={handleChangeNameInput}
        />
        <span className="cardname-error popup__form-input-error"></span>
      </div>
      <div className="popup__card-link-input">
        <input
          id="cardlink"
          type="url"
          name="link"
          className="popup__input popup__input_card_link"
          placeholder="Ссылка на картинку"
          required
          autoComplete="off"
          value={link}
          onChange={handleChangeLinkInput}
        />
        <span className="cardlink-error popup__form-input-error"></span>
      </div>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
