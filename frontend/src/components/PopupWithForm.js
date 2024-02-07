import React from "react";

export default function PopupWithForm({
  children,
  type,
  onSubmit,
  title,
  buttonTitle,
  handler,
  disabled = false,
}) {
  return (
    <div className={`${type}__window`}>
      <h3 className={`${type}__title`}>{title}</h3>
      <form className={`${type}__inputs`} name={type} onSubmit={onSubmit}>
        {children}
        <button
          className={`form__submit ${type}__save`}
          style={{
            backgroundColor: disabled ? "grey" : "",
            cursor: disabled ? "default" : "pointer",
          }}
          type="submit"
          onClick={handler}
          disabled={disabled}
        >
          {buttonTitle}
        </button>
      </form>
    </div>
  );
}
