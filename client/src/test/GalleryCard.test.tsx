import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import GalleryCard from "../components/GalleryCard/GalleryCard";

describe("GalleryCard", () => {
  it("renders the clothing image", () => {
    render(<GalleryCard source="https://example.com/item.jpg" />);

    const image = screen.getByAltText("Clothing item");

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "https://example.com/item.jpg");
  });
});
