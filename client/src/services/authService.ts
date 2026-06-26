import type { Outfit } from "../components/OutfitDisplay/OutfitDisplay.types";
import type {
  AuthResponse,
  FavouriteOutfit,
  LoginFormData,
  LogoutResponse,
  MessageResponse,
  RemoveFavouriteOutfitResponse,
  SignUpFormData,
  UpdateUserFormData,
  UpdateUserResponse,
} from "../types/auth.types";
import { baseURL, handleResponse } from "./apiClient";

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

const logOut = async (): Promise<LogoutResponse> => {
  const response = await fetch(`${baseURL}/logout`);

  return handleResponse<LogoutResponse>(response);
};

const deleteUser = async (
  id: string,
  token: string,
): Promise<MessageResponse> => {
  const response = await fetch(`${baseURL}/profile/delete/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });

  return handleResponse<MessageResponse>(response);
};

const updateUser = async (
  id: string,
  token: string,
  updates: UpdateUserFormData,
): Promise<UpdateUserResponse> => {
  const response = await fetch(`${baseURL}/profile/update/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(updates),
  });

  return handleResponse<UpdateUserResponse>(response);
};

const addFavouriteOutfit = async (
  id: string,
  outfit: Outfit,
): Promise<FavouriteOutfit[]> => {
  const response = await fetch(`${baseURL}/favourites/add/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(outfit),
  });

  return handleResponse<FavouriteOutfit[]>(response);
};

const getFavouriteOutfits = async (id: string): Promise<FavouriteOutfit[]> => {
  const response = await fetch(`${baseURL}/favourites/${id}`);

  return handleResponse<FavouriteOutfit[]>(response);
};

const removeFavouriteOutfit = async (
  userId: string,
  favouriteId: string,
): Promise<RemoveFavouriteOutfitResponse> => {
  const response = await fetch(
    `${baseURL}/favourites/remove/${userId}/${favouriteId}`,
    {
      method: "DELETE",
    },
  );

  return handleResponse<RemoveFavouriteOutfitResponse>(response);
};

export {
  signUp,
  logIn,
  logOut,
  deleteUser,
  updateUser,
  addFavouriteOutfit,
  getFavouriteOutfits,
  removeFavouriteOutfit,
};
