export interface ButtonProps {
  text: string;
  onClick?: () => void;
  className: string;
  type?: "button" | "submit" | "reset";
}
