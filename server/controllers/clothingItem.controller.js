const ClothingItem = require("../models/clothingItem.model");

// Saves a clothing item after the client receives the image URL from Cloudinary
exports.postImage = async (req, res) => {
  try {
    const newClothingItem = await ClothingItem.create(req.body);

    return res.status(201).json({
      message: "Clothing item uploaded successfully",
      clothingItem: newClothingItem,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong uploading the clothing item",
    });
  }
};

// Returns one random clothing item matching the selected weather criteria
exports.getRandomItem = async (req, res) => {
  const { item, tempToday, rainToday } = req.params;

  try {
    const allItems = await ClothingItem.find({
      item,
      tempRange: tempToday,
      rain: rainToday,
    });

    if (allItems.length === 0) {
      return res.status(404).json({
        message: "No appropriate clothing items were found",
      });
    }

    const randomItem = allItems[Math.floor(Math.random() * allItems.length)];

    return res.status(200).json(randomItem);
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong getting the clothing item",
    });
  }
};

exports.getAllItems = async (req, res) => {
  const { item } = req.params;

  try {
    const allItems = await ClothingItem.find({ item });

    if (allItems.length === 0) {
      return res.status(404).json({
        message: "No clothing items found for this category",
      });
    }

    return res.status(200).json(allItems);
  } catch (error) {
    return res.status(500).json({
      message:
        "Something went wrong getting the clothing items for this category",
    });
  }
};
