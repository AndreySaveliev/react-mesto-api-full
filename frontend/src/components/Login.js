import logo from "../images/header-logo.svg";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../utils/AuthApi";

function Login({ onSignin, onError, onOpenTip }) {
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
      .signin(password, email)
      .then((res) => {
        if (res) {
          localStorage.setItem("token", res.token);
          onSignin(email);
          navigate("/");
        }
      })
      .catch((error) => {
        onError();
        onOpenTip();
        console.log(error);
      });
  }

  return (
    <div className="login">
      <div className="login__header">
        <img className="header__logo" src={logo} alt="логотип"></img>
        <Link to="/signup" className="header__button">
          Регистрация
        </Link>
      </div>
      <form className="login__input-area" onSubmit={handleSubmit}>
        <h1 className="input-area__title">Вход</h1>
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
      <div className="login__button-area">
        <button
          className="button-area__main-button"
          type="submit"
          onClick={handleSubmit}
        >
          Войти
        </button>
      </div>
    </div>
  );
}

export default Login;
