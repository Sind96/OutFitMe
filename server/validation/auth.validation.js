const { z } = require("zod");

const registerSchema = z.object({
  body: z.object({
    username: z
      .string({
        error: "Username is required",
      })
      .min(2, "Username must be at least 2 characters"),
    email: z
      .string({
        error: "Email is required",
      })
      .email("Email must be valid"),
    password: z
      .string({
        error: "Password is required",
      })
      .min(6, "Password must be at least 6 characters"),
  }),
});

const loginSchema = z.object({
  body: z.object({
    username: z.string({
      error: "Username is required",
    }),
    password: z.string({
      error: "Password is required",
    }),
  }),
});

const updateProfileSchema = z.object({
  body: z
    .object({
      username: z.string().min(2).optional(),
      profilePicture: z.string().min(1).optional(),
    })
    .strict()
    .refine((data) => Object.keys(data).length > 0, {
      message: "At least one field is required",
    }),
});

const addFavouriteSchema = z.object({
  body: z
    .object({
      top: z.string().min(1),
      bottom: z.string().min(1),
      shoe: z.string().min(1),
    })
    .strict(),
});

module.exports = {
  registerSchema,
  loginSchema,
  updateProfileSchema,
  addFavouriteSchema,
};
