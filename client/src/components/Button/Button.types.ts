export interface ButtonProps {
  text: string;
  onClick?: () => void | Promise<void>;
  className: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}
