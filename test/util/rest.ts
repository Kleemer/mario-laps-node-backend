import * as jwt from 'jsonwebtoken'

function jwtHeader(): object {
  return { authorization: `Bearer ${ jwt.sign({}, process.env.JWT_SECRET || 'secret') }` }
}

export { jwtHeader }
