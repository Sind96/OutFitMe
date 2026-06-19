const ClothingItem = require("../models/clothingItem.model");
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");

// Saves a clothing item after the client receives the image URL from Cloudinary
exports.postImage = asyncHandler(async (req, res) => {
  const newClothingItem = await ClothingItem.create(req.body);

  return res.status(201).json({
    message: "Clothing item uploaded successfully",
    clothingItem: newClothingItem,
  });
});

// Returns one random clothing item matching the selected weather criteria
exports.getRandomItem = asyncHandler(async (req, res) => {
  const { item, tempToday, rainToday } = req.params;

  const allItems = await ClothingItem.find({
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

exports.getAllItems = asyncHandler(async (req, res) => {
  const { item } = req.params;

  const allItems = await ClothingItem.find({ item });

  if (allItems.length === 0) {
    throw new AppError("No clothing items found for this category", 404);
  }

  return res.status(200).json(allItems);
});
