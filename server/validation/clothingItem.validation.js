const { z } = require("zod");

const createClothingItemSchema = z.object({
  body: z.object({
    imgURL: z
      .string({
        error: "Image URL is required",
      })
      .url("Image URL must be valid"),
    item: z
      .string({
        error: "Item type is required",
      })
      .min(1, "Item type is required"),
    tempRange: z
      .array(z.string(), {
        error: "At least one temperature range is required",
      })
      .min(1, "At least one temperature range is required"),
    rain: z
      .string({
        error: "Rain suitability is required",
      })
      .min(1, "Rain suitability is required"),
  }),
});

module.exports = {
  createClothingItemSchema,
};
