import okimg from "../images/ok.svg";
import errimg from "../images/notok.svg";
function InfoToolTip({ onClose, isOpen, isError }) {
  return (
    <section className={`tool ${isOpen && "tool_active"}`}>
      <button
        type="button"
        aria-label="close"
        className="tool__close-button"
        onClick={onClose}
      ></button>
      <div className="tool__div">
        <img
          className="tool__img"
          src={`${isError ? errimg : okimg}`}
          alt={`${isError ? "Ошибка" : "Все хорошо"}`}
        ></img>
        <h1 className="tool__title">{`${
          isError
            ? "Что-то пошло не так! Попробуйте еще раз."
            : "Вы успешно зарегистрировались!"
        }`}</h1>
      </div>
    </section>
  );
}

export default InfoToolTip;
