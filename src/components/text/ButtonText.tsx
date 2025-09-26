import React from "react";
import "./ButtonText.css";

const ButtonText = ({ children }) => {
  return (
    <div>
      <span className="animated-text">{children}</span>
    </div>
  );
};

export default ButtonText;
