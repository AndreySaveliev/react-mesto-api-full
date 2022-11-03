import logo from "../images/header-logo.svg";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../utils/AuthApi";
function Register({ onOpenTip, onError }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleEmailInput(event) {
    setEmail(event.target.value);
  }

  function handlePasswordInput(event) {
    setPassword(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    auth
      .signup(password, email)
      .then((res) => {
        if (res) {
          navigate("/signin");
          onOpenTip();
        }
      })
      .catch((error) => {
        onError();
        onOpenTip();
        console.log(error)
      });
  }

  return (
    <div className="register">
      <div className="register__header">
        <img className="header__logo" src={logo} alt="logo"></img>
        <Link to="/signin" className="header__button">
          Войти
        </Link>
      </div>
      <form className="register__input-area" onSubmit={handleSubmit}>
        <h1 className="input-area__title">Регистрация</h1>
        <input
          className="input-area__input"
          placeholder="Email"
          required
          onChange={handleEmailInput}
          value={email || ""}
        />
        <input
          className="input-area__input"
          placeholder="Пароль"
          type="password"
          required
          onChange={handlePasswordInput}
          value={password || ""}
        />
      </form>
      <div className="register__button-area">
        <button
          className="button-area__main-button"
          type="submit"
          onClick={handleSubmit}
        >
          Зарегистрироваться
        </button>
        <Link to="/signin" className="input-area__addition-button">
          Уже зарегистрированы? Войти
        </Link>
      </div>
    </div>
  );
}

export default Register;
