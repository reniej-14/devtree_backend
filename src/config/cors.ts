import { CorsOptions } from 'cors'

export const corsConfig : CorsOptions = {
    origin: function(origin, callback) {
        if (origin === process.env.FRONTEND_URL) {
            console.log('Permitir conexion')
            callback(null, true)
        } else {
            console.log('Denegar la conexion')
            callback(new Error('Error de CORS'))
        }
    }
}