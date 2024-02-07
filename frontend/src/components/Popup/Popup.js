import closeIcon from "../../images/UI/Close-Icon.svg";

export function Popup({ type, children, isOpen, closePopup, className }) {
  return (
    <section className={`${className} ${type} ${isOpen ? `${type}_on` : ""}`}>
      <div className={`${type}__container`}>
        <button className={`${type}__close`} onClick={closePopup}>
          <img
            className={`${type}__close-image`}
            id={`${type}__close-image`}
            alt="Icono de cerrar"
            src={closeIcon}
          />
        </button>
        <div className={`${type}__content`}>{children}</div>
      </div>
      <div className={`${type}__BG`} onClick={closePopup} />
    </section>
  );
}
