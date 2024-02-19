const express = require("express");
const { PrismaClient } = require("@prisma/client");
const { z } = require("zod");
var cors = require("cors");
const app = express();
const prisma = new PrismaClient();
const {
  userSchema,
  transactionSchema,
  categorySchema,
} = require("./validationSchemas.js");

const PORT = 8000;
app.use(cors());
app.use(express.json());

app.post("/users", async (req, res, next) => {
  try {
    const safeParseResult = userSchema.safeParse(req.body);
    if (safeParseResult.error)
      return res.status(400).json({ error: safeParseResult.error });
    const { email, name, password } = safeParseResult.data;
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password,
      },
    });
    res.json(user);
  } catch (error) {
    next(error);
  }
});

app.post("/transactions", async (req, res, next) => {
  try {
    const safeParseResult = transactionSchema.safeParse(req.body);
    if (safeParseResult.error)
      return res.status(400).json({ error: safeParseResult.error });
    const { amount, description, userId, type } = safeParseResult.data;
    const transaction = await prisma.transaction.create({
      data: {
        amount,
        description,
        userId,
        type,
        categoryId: safeParseResult.data.categoryId,
      },
    });

    res.json(transaction);
  } catch (error) {
    next(error);
  }
});

app.get("/transactions", async (req, res, next) => {
  try {
    const transactions = await prisma.transaction.findMany();

    res.json(transactions);
  } catch (error) {
    next(error);
  }
});

app.post("/categories", async (req, res, next) => {
  try {
    const safeParseResult = categorySchema.safeParse(req.body);
    if (safeParseResult.error)
      return res.status(400).json({ error: safeParseResult.error });
    const category = await prisma.category.create({
      data: safeParseResult.data,
    });
    res.json(category);
  } catch (error) {
    next(error);
  }
});

app.use((error, req, res, next) => {
  console.error(error); // Log the error for debugging
  res
    .status(error.status || 500)
    .json({ message: error.message || "Internal Server Error" });
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
