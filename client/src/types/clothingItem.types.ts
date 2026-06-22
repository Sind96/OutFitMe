export interface ClothingItemFormData {
  imgURL: string;
  item: string;
  tempRange: string[];
  rain: string;
}

export interface ClothingItem {
  _id: string;
  imgURL: string;
  item: string;
  tempRange: string[];
  rain: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateClothingItemResponse {
  message: string;
  clothingItem: ClothingItem;
}
