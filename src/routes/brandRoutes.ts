import { Router } from "express";
import { getRecords, getRecord, createRecord, updateRecord, deleteRecord } from "../controllers/brandController.js";

export const brandRouter = Router();

// GET /brands - Hent alle brands
brandRouter.get("/", getRecords);

// GET /brands/:id - Hent specifik brand
brandRouter.get("/:id", getRecord);

// POST /brands - Opret nyt brand
brandRouter.post("/", createRecord);

// PUT /brands/:id - Opdater brand
brandRouter.put("/:id", updateRecord);

// DELETE /brands/:id - Slet brand
brandRouter.delete("/:id", deleteRecord);
