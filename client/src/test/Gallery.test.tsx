import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";

import Gallery from "../components/Gallery/Gallery";
import { getAllItemsFromCat } from "../services/clothingItemService";

const { mockAuth } = vi.hoisted(() => ({
  mockAuth: {
    token: "test-jwt-token" as string | null,
  },
}));

vi.mock("../store/hooks/reduxHooks", () => ({
  useAppSelector: () => ({
    token: mockAuth.token,
    currentUser: {
      _id: "user-123",
      username: "Test User",
      email: "test@test.com",
      profilePicture: "/default-profile.png",
    },
  }),
}));

vi.mock("../services/clothingItemService", () => ({
  getAllItemsFromCat: vi.fn(),
  deleteClothingItem: vi.fn(),
}));

describe("Gallery", () => {
  beforeEach(() => {
    mockAuth.token = "test-jwt-token";
    vi.clearAllMocks();
  });

  it("shows loading state while fetching gallery items", () => {
    vi.mocked(getAllItemsFromCat).mockReturnValue(new Promise(() => {}));

    render(<Gallery itemType="top" refreshKey={0} />);

    expect(screen.getByText("Loading gallery...")).toBeInTheDocument();
  });

  it("shows gallery items when the request succeeds", async () => {
    vi.mocked(getAllItemsFromCat).mockResolvedValue([
      {
        _id: "1",
        userId: "user-123",
        imgURL: "https://example.com/top.jpg",
        item: "top",
        tempRange: ["warm"],
        rain: "true",
      },
    ]);

    render(<Gallery itemType="top" refreshKey={0} />);

    const image = await screen.findByAltText("Clothing item");

    expect(image).toBeInTheDocument();
    expect(getAllItemsFromCat).toHaveBeenCalledWith("test-jwt-token", "top");
  });

  it("shows empty state when no gallery items are returned", async () => {
    vi.mocked(getAllItemsFromCat).mockResolvedValue([]);

    render(<Gallery itemType="top" refreshKey={0} />);

    await waitFor(() => {
      expect(
        screen.getByRole("heading", {
          name: "No top items uploaded yet.",
        }),
      ).toBeInTheDocument();

      expect(
        screen.getByText("Add some clothing items to start building outfits."),
      ).toBeInTheDocument();
    });
  });

  it("shows error state when the request fails", async () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    vi.mocked(getAllItemsFromCat).mockRejectedValue(new Error("API failed"));

    render(<Gallery itemType="top" refreshKey={0} />);

    const errorHeading = await screen.findByRole("heading", {
      name: "We couldn't load your wardrobe.",
    });

    expect(errorHeading).toBeInTheDocument();
    expect(
      screen.getByText("Please try again in a moment."),
    ).toBeInTheDocument();

    consoleSpy.mockRestore();
  });

  it("does not fetch clothing items without a token", () => {
    mockAuth.token = null;

    render(<Gallery itemType="top" refreshKey={0} />);

    expect(getAllItemsFromCat).not.toHaveBeenCalled();

    expect(
      screen.getByRole("heading", {
        name: "No top items uploaded yet.",
      }),
    ).toBeInTheDocument();
  });
});
