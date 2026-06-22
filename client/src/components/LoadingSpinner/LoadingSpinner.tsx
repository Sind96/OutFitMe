import "./LoadingSpinner.css";
import { LoadingSpinnerProps } from "./LoadingSpinner.types";

function LoadingSpinner({ text = "Loading..." }: LoadingSpinnerProps) {
  return (
    <div className="loading-spinner-wrapper" role="status" aria-live="polite">
      <span className="loading-spinner" aria-hidden="true" />
      <span>{text}</span>
    </div>
  );
}

export default LoadingSpinner;
