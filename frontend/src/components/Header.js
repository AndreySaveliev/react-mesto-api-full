import logo from "../images/header-logo.svg";
import { useNavigate } from "react-router-dom";

function Header({ email }) {
  const navigate = useNavigate();

  function handleSignOut() {
    localStorage.removeItem("token");
    navigate("/signin");
  }

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="логотип" />
      <div className="header__user">
        <p className="header__userEmail">{email}</p>
        <button className="header__button_exit" onClick={handleSignOut}>
          Выйти
        </button>
      </div>
    </header>
  );
}

export default Header;
