import { Router } from "express";
import { body } from 'express-validator'
import { AuthController } from "./controllers/AuthController";
import { handleInputErrors } from "./middleware/validation";

const router = Router()

// Autenticacion y registro
router.post('/auth/register', 
    body('handle')
        .notEmpty().withMessage('El handle no puede ir vacío'),
    body('name')
        .notEmpty().withMessage('El nombre no puede ir vacío'),
    handleInputErrors,
    AuthController.createAcount)

export default router