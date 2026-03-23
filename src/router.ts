import { Router } from "express";
import { AuthController } from "./controllers/AuthController";

const router = Router()

// Autenticacion y registro
router.post('/auth/register', AuthController.createAcount)

export default router