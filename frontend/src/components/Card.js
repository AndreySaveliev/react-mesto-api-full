function Card({
  card,
  onCardClick,
  currentUser,
  onCardLike,
  onCardDeleteClick,
}) {
  const isAuthor = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((el) => el._id === currentUser._id);

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleCardDelete() {
    onCardDeleteClick();
    onCardClick(card._id);
  }

  return (
    <div className="grid__cell" key={card}>
      <button
        className={`grid__delete ${!isAuthor && "button_hiden"}`}
        onClick={() => handleCardDelete(card)}
      ></button>
      <img
        className="grid__img"
        src={card.link}
        onClick={() => handleClick(card)}
        alt={card.name}
      />
      <div className="grid__description">
        <h2 className="grid__name">{card.name}</h2>
        <button
          type="button"
          className={`grid__like ${isLiked && "grid__like_active"}`}
          onClick={() => handleLikeClick(card)}
        ></button>
        <p className="grid__like-number">{card.likes.length}</p>
      </div>
    </div>
  );
}

export default Card;
