import "./Button.css";
import type { ButtonProps } from "./Button.types";

function Button({ className, text, onClick, type = "button" }: ButtonProps) {
  return (
    <button className={className} onClick={onClick} type={type}>
      {text}
    </button>
  );
}

export default Button;
