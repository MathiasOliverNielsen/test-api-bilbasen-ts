// Fil: ./src/routes/loginRoutes.ts
import { Router } from "express";
import { login } from "../controllers/loginController.js";

const router = Router();

// Subroutes til /login
router.post("/", login);

export { router as loginRoutes };
