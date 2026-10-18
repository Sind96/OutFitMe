import type { Request, Response } from "express";

import ClothingItem from "../models/clothingItem.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import AppError from "../utils/AppError.js";

const getAuthenticatedUserId = (req: Request): string => {
  const userId = req.user?.userId;

  if (!userId) {
    throw new AppError("Authentication required", 401);
  }

  return userId;
};

const postImage = asyncHandler(async (req: Request, res: Response) => {
  const userId = getAuthenticatedUserId(req);
  const { imgURL, item, tempRange, rain } = req.body;

  const newClothingItem = await ClothingItem.create({
    userId,
    imgURL,
    item,
    tempRange,
    rain,
  });

  return res.status(201).json({
    message: "Clothing item uploaded successfully",
    clothingItem: newClothingItem,
  });
});

const getRandomItem = asyncHandler(async (req: Request, res: Response) => {
  const userId = getAuthenticatedUserId(req);
  const { item, tempToday, rainToday } = req.params;

  const allItems = await ClothingItem.find({
    userId,
    item,
    tempRange: tempToday,
    rain: rainToday,
  });

  if (allItems.length === 0) {
    throw new AppError("No appropriate clothing items were found", 404);
  }

  const randomItem = allItems[Math.floor(Math.random() * allItems.length)];

  return res.status(200).json(randomItem);
});

const getAllItems = asyncHandler(async (req: Request, res: Response) => {
  const userId = getAuthenticatedUserId(req);
  const { item } = req.params;

  const allItems = await ClothingItem.find({
    userId,
    item,
  });

  return res.status(200).json(allItems);
});

const deleteClothingItem = asyncHandler(async (req: Request, res: Response) => {
  const userId = getAuthenticatedUserId(req);
  const { id } = req.params;

  const deletedItem = await ClothingItem.findOneAndDelete({
    _id: id,
    userId,
  });

  if (!deletedItem) {
    throw new AppError("Clothing item not found", 404);
  }

  return res.status(200).json({
    message: "Clothing item deleted successfully",
  });
});

export { postImage, getRandomItem, getAllItems, deleteClothingItem };
