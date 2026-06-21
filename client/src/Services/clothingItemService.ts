import {
  ClothingItem,
  ClothingItemFormData,
  CreateClothingItemResponse,
} from "../Types/clothingItem.types";
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
  item: string,
  tempToday: string,
  rainToday: boolean,
): Promise<string> => {
  const response = await fetch(
    `${baseURL}/api/clothing-items/random/${item}/${tempToday}/${rainToday}`,
  );

  const randomItem = await handleResponse<ClothingItem>(response);

  return randomItem.imgURL;
};

const getAllItemsFromCat = async (item: string): Promise<ClothingItem[]> => {
  const response = await fetch(`${baseURL}/api/clothing-items/${item}`);

  return handleResponse<ClothingItem[]>(response);
};

export { addClothingItem, getRandomItem, getAllItemsFromCat };
