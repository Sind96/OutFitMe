import "./Button.css";
import type { ButtonProps } from "./Button.types";

function Button({
  className,
  text,
  onClick,
  type = "button",
  disabled = false,
}: ButtonProps) {
  return (
    <button
      className={className}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {text}
    </button>
  );
}

export default Button;
