import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import User from '../schemas/user'

export default class VerifyToken {

  public async validateToken(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    const token = getToken(req.headers.authorization)
    if(token === null) {
      return res.sendStatus(403)
    }
    try {
      jwt.verify(token, process.env.JWT_SECRET || 'default')
    } catch(err) {
      console.log(err)
      return res.sendStatus(403)
    }
    return next()
  }

  public async staffUser(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    const token = getToken(req.headers.authorization)
    if(!token) {
      return res.sendStatus(403)
    }
    const user = await User.findById(jwt.decode(token))
    if(!user?.staff) {
      return res.sendStatus(403)
    }
    return next()
  }
}

function getToken(authHeader: string | undefined): null | string {
  if(!authHeader) {
    return null
  }
  const bearerToken = authHeader.split(' ')
  if(bearerToken.length !== 2) {
    return null
  }
  if(bearerToken[0] !== 'Bearer') {
    return null
  }
  return bearerToken[1]
}
