function PopupWithForm({
  onClose,
  name,
  title,
  buttonText,
  isOpen,
  children,
  onSubmit,
}) {
  return (
    <section
      className={`popup popup-${name} ${isOpen && "popup_opened"}`}
      onClick={onClose}
    >
      <div className="popup__container" onClick={(e) => e.stopPropagation()}>
        <div className={`popup-${name}-block`}>
          <h3 className="popup__title">{title}</h3>
          <button
            type="button"
            aria-label="close"
            className={`popup__close-button popup__close-button_${name}`}
            onClick={onClose}
          ></button>
          <form
            name="popup__form"
            id={`popup__${name}`}
            className="popup__form"
            noValidate
            onSubmit={onSubmit}
          >
            {children}
            <button
              type="submit"
              className={`popup__submit-button popup__submit-button_${name}`}
            >
              {buttonText}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default PopupWithForm;
