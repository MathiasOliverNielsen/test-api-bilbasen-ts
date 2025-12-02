import { Router } from "express";
import { afdelingerController } from "../controllers/afdelingerController.js";

export const afdelingerRouter = Router();

// GET /afdelinger - Hent alle afdelinger
afdelingerRouter.get("/", afdelingerController.getAllAfdelinger);

// GET /afdelinger/search - Søg afdelinger (skal være før /:id for at undgå konflikt)
afdelingerRouter.get("/search", afdelingerController.searchAfdelinger);

// GET /afdelinger/:id - Hent specifik afdeling
afdelingerRouter.get("/:id", afdelingerController.getAfdelingById);

// GET /afdelinger/:id/cars - Hent alle biler på en specifik afdeling
afdelingerRouter.get("/:id/cars", afdelingerController.getCarsByAfdeling);

// POST /afdelinger - Opret ny afdeling
afdelingerRouter.post("/", afdelingerController.createAfdeling);

// PUT /afdelinger/:id - Opdater afdeling
afdelingerRouter.put("/:id", afdelingerController.updateAfdeling);

// DELETE /afdelinger/:id - Slet afdeling
afdelingerRouter.delete("/:id", afdelingerController.deleteAfdeling);
