import { Request, Response } from "express"
import User from "../config/models/User"

export class AuthController {

    static createAcount = async (req: Request, res: Response) => {
        const { email } = req.body

        const userExist = await User.findOne({email})
        if (userExist) {
            const error = new Error('El usuario ya está registrado')
            return res.status(409).json({error: error.message})
        }

        const user = new User(req.body)

        await user.save()
        res.status(201).send('Usuario agregado correctamente')
    }
}