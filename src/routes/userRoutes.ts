import { Router } from "express";
import { getRecords, getRecord, createRecord, updateRecord, deleteRecord } from "../controllers/userController.js";

const router = Router();

// GET /users - Hent alle users
router.get("/", getRecords);

// GET /users/:id - Hent specifik user
router.get("/:id", getRecord);

// POST /users - Opret user
router.post("/", createRecord);

// PUT /users/:id - Opdater user
router.put("/:id", updateRecord);

// DELETE /users/:id - Slet user
router.delete("/:id", deleteRecord);

export const userRoutes = router;
