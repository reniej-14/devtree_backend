import { Router } from "express";
import { body } from 'express-validator'
import { AuthController } from "./controllers/AuthController";
import { handleInputErrors } from "./middleware/validation";
import { authenticate } from "./middleware/auth";

const router = Router()

// Autenticacion y registro
router.post('/auth/register', 
    body('handle')
        .notEmpty()
        .withMessage('El handle no puede ir vacío'),
    body('name')
        .notEmpty()
        .withMessage('El nombre no puede ir vacío'),
    body('email')
        .isEmail()
        .withMessage('Email no válido'),
    body('password')
        .isLength({min: 8})
        .withMessage('El password es muy corto, mínimo 8 caracteres'),
    handleInputErrors,
    AuthController.createAcount
)

router.post('/auth/login',
    body('email')
        .isEmail()
        .withMessage('Email no válido'),
     body('password')
        .notEmpty()
        .withMessage('El password es obligatorio'),
    handleInputErrors,
    AuthController.login
)

router.get('/user',
    authenticate,
    AuthController.getUser
)

router.patch('/user', 
    body('handle')
        .notEmpty()
        .withMessage('El handle no puede ir vacío'),
    body('description')
        .notEmpty()
        .withMessage('La descripción no puede ir vacía'),
    handleInputErrors,
    authenticate,
    AuthController.updateProfile
)

router.post('/image',
    authenticate,
    AuthController.uploadImage
)

export default router