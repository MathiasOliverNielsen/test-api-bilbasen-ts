import { Router } from "express";
import {
  getRecords,
  getRecord,
  createRecord,
  updateRecord,
  deleteRecord,
  getJylland,
  getJyllandCars,
  getJyllandCarById,
  getFyn,
  getFynCars,
  getFynCarById,
  getSjaelland,
  getSjaellandCars,
  getSjaellandCarById,
} from "../controllers/afdelingerController.js";

export const afdelingerRouter = Router();

// Regionsspecifikke routes (skal være før generelle routes)
// Jylland
afdelingerRouter.get("/jylland", getJylland);
afdelingerRouter.get("/jylland/cars", getJyllandCars);
afdelingerRouter.get("/jylland/cars/:id", getJyllandCarById);

// Fyn
afdelingerRouter.get("/fyn", getFyn);
afdelingerRouter.get("/fyn/cars", getFynCars);
afdelingerRouter.get("/fyn/cars/:id", getFynCarById);

// Sjælland
afdelingerRouter.get("/sjaelland", getSjaelland);
afdelingerRouter.get("/sjaelland/cars", getSjaellandCars);
afdelingerRouter.get("/sjaelland/cars/:id", getSjaellandCarById);

// Grundlæggende CRUD routes
afdelingerRouter.get("/", getRecords);
afdelingerRouter.get("/:id", getRecord);
afdelingerRouter.post("/", createRecord);
afdelingerRouter.put("/:id", updateRecord);
afdelingerRouter.delete("/:id", deleteRecord);
