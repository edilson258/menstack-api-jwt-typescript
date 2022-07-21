import { Request, Response } from 'express'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../schemas/user'

export default class UserController {
  
  public async addUser(req: Request, res: Response): Promise<Response> {

    const { username, password } = req.body
    if(!username || !password) {
      return res.status(400).json({ error: 'username and password are rquired' })
    }

    if(await User.findOne({ username: username })) {
      return res.status(400).json({ error: 'username already exists' })
    }

    const user = await User.create({
      username: username,
      password: await bcryptjs.hash(password, await bcryptjs.genSalt())
    })
    
    const token = jwt.sign(user._id, process.env.JWT_SECRET || 'default', { expiresIn: '30d' }, (err, token) => {
      if(err) {
        console.error(err)
        return null
      }
      return token
    }) 
    return res.status(201).json({ token })
  }
}
