function ImagePopup({ onClose, card }) {
  if (card.name !== undefined) {
    return (
      <section
        className={`popup popup-card popup-card-section popup_opened`}
        onClick={onClose}
      >
        <div className="popup-card__block" onClick={(e) => e.stopPropagation()}>
          <div className="popup-card__description">
            <img
              className="popup-card__image"
              alt={card.name}
              src={card.link}
            />
            <h2 className="popup-card__title">{card.name}</h2>
          </div>
          <button
            type="button"
            aria-label="close"
            className="popup-card__close-button-card popup__close-button"
            onClick={onClose}
          ></button>
        </div>
      </section>
    );
  }
}

export default ImagePopup;
