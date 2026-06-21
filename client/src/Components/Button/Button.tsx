import "./Button.css";
import { ButtonProps } from "./Button.Types";

function Button({ className, text, onClick, type = "button" }: ButtonProps) {
  return (
    <button className={className} onClick={onClick} type={type}>
      {text}
    </button>
  );
}

export default Button;
