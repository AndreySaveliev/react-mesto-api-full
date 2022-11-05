import PopupWithForm from "./PopupWithForm";
function DeleteCardPopup({ isOpen, onClose, onCardDelete, card }) {
  function handleSubmit(event) {
    event.preventDefault();
    console.log(card)
    onCardDelete(card);
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      name="delete-card"
      title="Вы уверены?"
      buttonText="Да"
    />
  );
}

export default DeleteCardPopup;
