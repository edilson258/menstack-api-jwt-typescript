import { Router } from 'express'
import UsersController from '../controllers/usersController'

export default class UsersRouter {

  public router: Router
  private usersController: UsersController

  constructor() {
    this.router = Router()
    this.usersController = new UsersController()
    this.routes()
  }

  private routes(): void {
    this.router.post('/signup/', this.usersController.addUser)
    this.router.post('/login/', this.usersController.getToken)
  }
}
