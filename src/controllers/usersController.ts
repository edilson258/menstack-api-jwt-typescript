import { Request, Response } from 'express'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../schemas/user'

export default class UserController {
  
  // SignUp
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
    const token = signToken(user._id.toString()) 
    if(token === null) {
      return res.status(500).json({ error: 'Internal server error' })
    }
    return res.status(201).json({ token })
  }

  // Login
  public async getToken(req: Request, res: Response): Promise<Response> {
    const { username, password } = req.body
    const user = await User.findOne({ username: username })
    if(!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    if(!await bcryptjs.compare(password, user.password)) {
      return res.status(403).json({ error: 'Wrong credentials' })
    }
    const token = signToken(user._id.toString())
    return res.status(200).json({ token })
  }
}

function signToken(_id: string) {
  return jwt.sign({ _id: _id }, process.env.JWT_SECRET || 'default', { expiresIn: "30d" })
}
