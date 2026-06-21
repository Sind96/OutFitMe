import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import Gallery from "../components/Gallery/Gallery";
import { getAllItemsFromCat } from "../services/clothingItemService";

vi.mock("../services/clothingItemService", () => ({
  getAllItemsFromCat: vi.fn(),
}));

describe("Gallery", () => {
  it("shows loading state while fetching gallery items", () => {
    vi.mocked(getAllItemsFromCat).mockReturnValue(new Promise(() => {}));

    render(<Gallery itemType="top" />);

    expect(screen.getByText("Loading gallery...")).toBeInTheDocument();
  });

  it("shows gallery items when the request succeeds", async () => {
    vi.mocked(getAllItemsFromCat).mockResolvedValue([
      {
        _id: "1",
        imgURL: "https://example.com/top.jpg",
        item: "top",
        tempRange: ["warm"],
        rain: "true",
      },
    ]);

    render(<Gallery itemType="top" />);

    const image = await screen.findByAltText("Clothing item");

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "https://example.com/top.jpg");
  });

  it("shows empty state when no gallery items are returned", async () => {
    vi.mocked(getAllItemsFromCat).mockResolvedValue([]);

    render(<Gallery itemType="top" />);

    await waitFor(() => {
      expect(screen.getByText("No top items found.")).toBeInTheDocument();
    });
  });

  it("shows error state when the request fails", async () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    vi.mocked(getAllItemsFromCat).mockRejectedValue(new Error("API failed"));

    render(<Gallery itemType="top" />);

    const errorMessage = await screen.findByText(
      "Unable to load gallery items. Please try again.",
    );

    expect(errorMessage).toBeInTheDocument();

    consoleSpy.mockRestore();
  });
});
