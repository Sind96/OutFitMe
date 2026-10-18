const { z } = require("zod");

const createClothingItemSchema = z.object({
  body: z
    .object({
      imgURL: z.string().url("Image URL must be valid"),
      item: z.string().min(1, "Item type is required"),
      tempRange: z
        .array(z.string().min(1))
        .min(1, "At least one temperature range is required"),
      rain: z.string().min(1, "Rain suitability is required"),
    })
    .strict(),
});

module.exports = {
  createClothingItemSchema,
};
