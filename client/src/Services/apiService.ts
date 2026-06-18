import type {
  ClothingItem,
  ClothingItemFormData,
  CreateClothingItemResponse,
} from "../Types/clothingItem.types";

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:3000";
const weatherAPIkey = import.meta.env.VITE_OPENWEATHER_API_KEY;

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
};

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

const getWeatherData = async (lat: number, lon: number) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherAPIkey}&units=metric`;

  const response = await fetch(url);

  return handleResponse(response);
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

export { addClothingItem, getWeatherData, getRandomItem, getAllItemsFromCat };
