import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import Button from "../components/Button/Button";

describe("Button", () => {
  it("renders the button text", () => {
    render(<Button className="test-button" text="Click me" />);

    expect(
      screen.getByRole("button", { name: "Click me" }),
    ).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const handleClick = vi.fn();

    render(
      <Button className="test-button" text="Click me" onClick={handleClick} />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Click me" }));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("does not call onClick when disabled", () => {
    const handleClick = vi.fn();

    render(
      <Button
        className="test-button"
        text="Click me"
        onClick={handleClick}
        disabled
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Click me" }));

    expect(handleClick).not.toHaveBeenCalled();
  });

  it("uses button type by default", () => {
    render(<Button className="test-button" text="Click me" />);

    expect(screen.getByRole("button", { name: "Click me" })).toHaveAttribute(
      "type",
      "button",
    );
  });

  it("uses custom button type when provided", () => {
    render(<Button className="test-button" text="Submit" type="submit" />);

    expect(screen.getByRole("button", { name: "Submit" })).toHaveAttribute(
      "type",
      "submit",
    );
  });
});
