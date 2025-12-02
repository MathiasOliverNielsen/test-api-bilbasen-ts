import { Router } from "express";
import { carController } from "../controllers/carController.js";

export const carRouter = Router();

// GET /cars - Hent alle biler
carRouter.get("/", carController.getAllCars);

// GET /cars/search - Søg biler (skal være før /:id for at undgå konflikt)
carRouter.get("/search", carController.searchCars);

// GET /cars/:id - Hent specifik bil
carRouter.get("/:id", carController.getCarById);

// POST /cars - Opret ny bil
carRouter.post("/", carController.createCar);

// PUT /cars/:id - Opdater bil
carRouter.put("/:id", carController.updateCar);

// DELETE /cars/:id - Slet bil
carRouter.delete("/:id", carController.deleteCar);
