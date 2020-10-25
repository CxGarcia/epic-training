import React from "react";
import styles from "./Button.module.css";

function Button({ onFunc, children, type, size }) {
  function onClick(event) {
    event.preventDefault();
    onFunc();
  }

  return (
    <div>
      <button className={`${styles[type]} ${styles[size]}`} onClick={onClick}>
        {children}
      </button>
    </div>
  );
}

export default Button;
