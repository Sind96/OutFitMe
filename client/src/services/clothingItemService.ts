import type {
  ClothingItem,
  ClothingItemFormData,
  CreateClothingItemResponse,
} from "../types/clothingItem.types";
import { baseURL, handleResponse } from "./apiClient";

const addClothingItem = async (
  formData: ClothingItemFormData,
): Promise<CreateClothingItemResponse> => {
  const response = await fetch(`${baseURL}/api/clothing-items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  return handleResponse<CreateClothingItemResponse>(response);
};

const getRandomItem = async (
  userId: string,
  item: string,
  tempToday: string,
  rainToday: boolean,
): Promise<string> => {
  const response = await fetch(
    `${baseURL}/api/clothing-items/random/${userId}/${item}/${tempToday}/${rainToday}`,
  );

  const randomItem = await handleResponse<ClothingItem>(response);

  return randomItem.imgURL;
};

const getAllItemsFromCat = async (
  userId: string,
  item: string,
): Promise<ClothingItem[]> => {
  const response = await fetch(
    `${baseURL}/api/clothing-items/${userId}/${item}`,
  );

  return handleResponse<ClothingItem[]>(response);
};

const deleteClothingItem = async (
  userId: string,
  id: string,
): Promise<{ message: string }> => {
  const response = await fetch(
    `${baseURL}/api/clothing-items/${userId}/${id}`,
    {
      method: "DELETE",
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
