import './Button.css';

interface ButtonProps {
  text: string;
  onClick?: () => void;
  className: string;
}


function Button({ className, text, onClick }: ButtonProps) {
  return (
      <button className={className} onClick={onClick}>
        {text}
      </button>
  );
}

export default Button;