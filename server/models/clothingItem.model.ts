import mongoose, { type Types } from "mongoose";

interface IClothingItem {
  userId: Types.ObjectId;
  imgURL: string;
  item: string;
  tempRange: string[];
  rain: string;
}

const clothingItemSchema = new mongoose.Schema<IClothingItem>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  imgURL: {
    type: String,
    required: true,
  },
  item: {
    type: String,
    lowercase: true,
    required: true,
  },
  tempRange: {
    type: [String],
    lowercase: true,
    required: true,
  },
  rain: {
    type: String,
    required: true,
  },
});

const ClothingItem = mongoose.model<IClothingItem>(
  "ClothingItem",
  clothingItemSchema,
);

export default ClothingItem;
