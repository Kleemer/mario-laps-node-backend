import * as jwt from 'jsonwebtoken'
import { ExpressMiddlewareInterface, Middleware } from "routing-controllers"

@Middleware({ type: "before" })
export class Auth implements ExpressMiddlewareInterface {

    use(request: any, response: any, next: (err?: any) => any): any {
        const authorization = request.headers.authorization
        if (authorization) {
            const token = authorization.replace('Bearer ', '')
            if (token.length > 1) {
                try {
                    jwt.verify(token, process.env.JWT_SECRET || 'secret')
                    next()
                } catch (err) {
                    response.status(401).send({ error: 'Invalid authorization token.' })
                }
            } else {
                response.status(401).send({ error: 'Invalid authorization header.' })
            }
        } else {
            response.status(401).send({ error: 'Missing authorization header.' })
        }
    }
}
