import {
  ExpressErrorMiddlewareInterface,
  Middleware,
} from 'routing-controllers'

@Middleware({ type: 'after' })
export class Error implements ExpressErrorMiddlewareInterface {
  error(error: any, _request: any, response: any, _: (err: any) => any) {
    if (!response.finished) {
      response.status(error.status || 500).json({
        message: error.message,
        errors: error.errors,
      })
    }
  }
}
