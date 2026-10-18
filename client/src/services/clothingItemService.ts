import type {
  ClothingItem,
  ClothingItemFormData,
  CreateClothingItemResponse,
} from "../types/clothingItem.types";
import { baseURL, handleResponse } from "./apiClient";

const getAuthHeaders = (token: string) => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
});

const addClothingItem = async (
  token: string,
  formData: ClothingItemFormData,
): Promise<CreateClothingItemResponse> => {
  const response = await fetch(`${baseURL}/api/clothing-items`, {
    method: "POST",
    headers: getAuthHeaders(token),
    body: JSON.stringify(formData),
  });

  return handleResponse<CreateClothingItemResponse>(response);
};

const getRandomItem = async (
  token: string,
  item: string,
  tempToday: string,
  rainToday: boolean,
): Promise<string> => {
  const response = await fetch(
    `${baseURL}/api/clothing-items/random/${encodeURIComponent(item)}/${encodeURIComponent(tempToday)}/${rainToday}`,
    {
      headers: getAuthHeaders(token),
    },
  );

  const randomItem = await handleResponse<ClothingItem>(response);
  return randomItem.imgURL;
};

const getAllItemsFromCat = async (
  token: string,
  item: string,
): Promise<ClothingItem[]> => {
  const response = await fetch(
    `${baseURL}/api/clothing-items/${encodeURIComponent(item)}`,
    {
      headers: getAuthHeaders(token),
    },
  );

  return handleResponse<ClothingItem[]>(response);
};

const deleteClothingItem = async (
  token: string,
  id: string,
): Promise<{ message: string }> => {
  const response = await fetch(
    `${baseURL}/api/clothing-items/${encodeURIComponent(id)}`,
    {
      method: "DELETE",
      headers: getAuthHeaders(token),
    },
  );

  return handleResponse<{ message: string }>(response);
};

export {
  addClothingItem,
  getRandomItem,
  getAllItemsFromCat,
  deleteClothingItem,
};
