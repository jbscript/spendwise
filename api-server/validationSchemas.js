// validationSchemas.js
const { z } = require("zod");

const userSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  password: z.string().min(6),
});

const transactionSchema = z.object({
  amount: z.number().positive(),
  description: z.string(),
  userId: z.string(),
  type: z.enum(["INCOME", "EXPENSE"]),
  categoryId: z.string().optional(),
});

const categorySchema = z.object({
  name: z.string(),
});

module.exports = { userSchema, transactionSchema, categorySchema };
