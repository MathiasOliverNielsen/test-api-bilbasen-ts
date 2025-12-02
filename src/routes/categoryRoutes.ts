import { Router } from "express";
import { categoryController } from "../controllers/categoryController.js";

export const categoryRouter = Router();

// GET /categories - Hent alle kategorier
categoryRouter.get("/", categoryController.getAllCategories);

// GET /categories/:id - Hent specifik kategori
categoryRouter.get("/:id", categoryController.getCategoryById);

// GET /categories/:id/cars - Hent alle biler i en kategori
categoryRouter.get("/:id/cars", categoryController.getCarsByCategory);

// POST /categories - Opret ny kategori
categoryRouter.post("/", categoryController.createCategory);

// PUT /categories/:id - Opdater kategori
categoryRouter.put("/:id", categoryController.updateCategory);

// DELETE /categories/:id - Slet kategori
categoryRouter.delete("/:id", categoryController.deleteCategory);
