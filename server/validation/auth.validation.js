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

module.exports = {
  registerSchema,
  loginSchema,
};
