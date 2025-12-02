import { Router } from "express";
import { brandController } from "../controllers/brandController.js";

export const brandRouter = Router();

// GET /brands - Hent alle brands
brandRouter.get("/", brandController.getAllBrands);

// GET /brands/:id - Hent specifik brand
brandRouter.get("/:id", brandController.getBrandById);

// POST /brands - Opret nyt brand
brandRouter.post("/", brandController.createBrand);

// PUT /brands/:id - Opdater brand
brandRouter.put("/:id", brandController.updateBrand);

// DELETE /brands/:id - Slet brand
brandRouter.delete("/:id", brandController.deleteBrand);
