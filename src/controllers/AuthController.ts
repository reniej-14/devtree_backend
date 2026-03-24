import { Request, Response } from "express"
import slug from 'slug'
import User from "../config/models/User"
import { hashPassword } from "../utils/auth"

export class AuthController {

    static createAcount = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body

            const userExist = await User.findOne({email})
            if (userExist) {
                const error = new Error('Un usuario con ese email ya está registrado')
                return res.status(409).json({error: error.message})
            }

            const handle = slug(req.body.handle, '')
            const handleExist = await User.findOne({handle})
            if (handleExist) {
                const error = new Error('Nombre de usuario no disponible')
                return res.status(409).json({error: error.message})
            }

            const user = new User(req.body)
            user.password = await hashPassword(password)
            user.handle = handle

            await user.save()
            res.status(201).send('Usuario agregado correctamente')
        } catch (error) {
            res.status(500).json({error: 'Hubo un error'})
        }
    }
}