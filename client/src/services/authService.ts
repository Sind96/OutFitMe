import type { Outfit } from "../components/OutfitDisplay/OutfitDisplay.types";
import type {
  AuthResponse,
  FavouriteOutfit,
  LoginFormData,
  MessageResponse,
  RemoveFavouriteOutfitResponse,
  SignUpFormData,
  UpdateUserFormData,
  UpdateUserResponse,
} from "../types/auth.types";
import { baseURL, handleResponse } from "./apiClient";

const getAuthHeaders = (token: string) => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
});

const signUp = async (formData: SignUpFormData): Promise<AuthResponse> => {
  const response = await fetch(`${baseURL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  return handleResponse<AuthResponse>(response);
};

const logIn = async (formData: LoginFormData): Promise<AuthResponse> => {
  const response = await fetch(`${baseURL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  return handleResponse<AuthResponse>(response);
};

const deleteUser = async (
  id: string,
  token: string,
): Promise<MessageResponse> => {
  const response = await fetch(`${baseURL}/profile/delete`, {
    method: "DELETE",
    headers: getAuthHeaders(token),
  });

  return handleResponse<MessageResponse>(response);
};

const updateUser = async (
  id: string,
  token: string,
  updates: UpdateUserFormData,
): Promise<UpdateUserResponse> => {
  const response = await fetch(`${baseURL}/profile/update`, {
    method: "PUT",
    headers: getAuthHeaders(token),
    body: JSON.stringify(updates),
  });

  return handleResponse<UpdateUserResponse>(response);
};

const addFavouriteOutfit = async (
  token: string,
  outfit: Outfit,
): Promise<FavouriteOutfit[]> => {
  const response = await fetch(`${baseURL}/favourites`, {
    method: "POST",
    headers: getAuthHeaders(token),
    body: JSON.stringify(outfit),
  });

  return handleResponse<FavouriteOutfit[]>(response);
};

const getFavouriteOutfits = async (
  token: string,
): Promise<FavouriteOutfit[]> => {
  const response = await fetch(`${baseURL}/favourites`, {
    headers: getAuthHeaders(token),
  });

  return handleResponse<FavouriteOutfit[]>(response);
};

const removeFavouriteOutfit = async (
  token: string,
  favouriteId: string,
): Promise<RemoveFavouriteOutfitResponse> => {
  const response = await fetch(`${baseURL}/favourites/${favouriteId}`, {
    method: "DELETE",
    headers: getAuthHeaders(token),
  });

  return handleResponse<RemoveFavouriteOutfitResponse>(response);
};

export {
  signUp,
  logIn,
  deleteUser,
  updateUser,
  addFavouriteOutfit,
  getFavouriteOutfits,
  removeFavouriteOutfit,
};
