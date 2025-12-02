import { Router } from "express";
import { getRecords, getRecord, createRecord, updateRecord, deleteRecord } from "../controllers/carController.js";

export const carRouter = Router();

// GET /cars - Hent alle biler
carRouter.get("/", getRecords);

// GET /cars/:id - Hent specifik bil
carRouter.get("/:id", getRecord);

// POST /cars - Opret ny bil
carRouter.post("/", createRecord);

// PUT /cars/:id - Opdater bil
carRouter.put("/:id", updateRecord);

// DELETE /cars/:id - Slet bil
carRouter.delete("/:id", deleteRecord);
