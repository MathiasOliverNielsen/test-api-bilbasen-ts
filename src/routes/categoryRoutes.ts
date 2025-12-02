import { Router } from "express";
import { getRecords, getRecord, createRecord, updateRecord, deleteRecord } from "../controllers/categoryController.js";

export const categoryRouter = Router();

// GET /categories - Hent alle kategorier
categoryRouter.get("/", getRecords);

// GET /categories/:id - Hent specifik kategori
categoryRouter.get("/:id", getRecord);

// POST /categories - Opret ny kategori
categoryRouter.post("/", createRecord);

// PUT /categories/:id - Opdater kategori
categoryRouter.put("/:id", updateRecord);

// DELETE /categories/:id - Slet kategori
categoryRouter.delete("/:id", deleteRecord);
