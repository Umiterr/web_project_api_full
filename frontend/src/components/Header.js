import logo from "../images/UI/Logo.svg";

export function Header({ element: HeaderElement }) {
  return (
    <header className="header">
      <meta http-equiv="Content-Security-Policy" content="INSTRUCTIONS" />

      <img
        className="header__logo"
        id="header-logo"
        alt="Around The U.S."
        src={logo}
      />
      <HeaderElement />
    </header>
  );
}
