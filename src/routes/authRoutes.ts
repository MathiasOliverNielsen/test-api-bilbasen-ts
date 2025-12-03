// Fil: ./src/routes/authRoutes.ts
import { Router } from "express";
import { authenticateToken } from "../middleware/authenticateToken.js";
import { authorizeRole } from "../middleware/authorizeRole.js";
import { getUserProfile } from "../controllers/authController.js";

const router = Router();

// Først kører authenticateToken (tjekker om token er gyldig)
// Hvis token er OK, kører getUserProfile og returnerer brugerens data
router.get("/authenticate", authenticateToken, getUserProfile);

// Ny route der kræver ADMIN rolle
router.get("/authorize", authenticateToken, authorizeRole("ADMIN"), getUserProfile);

// Route der tillader både ADMIN og USER roller
router.get("/authorize-multi", authenticateToken, authorizeRole("ADMIN", "USER"), getUserProfile);

export { router as authRoutes };
