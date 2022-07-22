import { Router } from 'express'
import AsteroidsController from '../controllers/asteroidsController'
import VerifyToken from '../middlewares/verToken'

export default class AsteroidRouter {

  public router: Router
  private asteroidsController: AsteroidsController
  private verToken: VerifyToken

  constructor() {
    this.router = Router()
    this.asteroidsController = new AsteroidsController()
    this.verToken = new VerifyToken()
    this.routes()
  }

  private routes(): void {
    this.router.get('/', this.verToken.validateToken, this.asteroidsController.listAsteroids)
    this.router.get('/:_id/', this.verToken.validateToken, this.asteroidsController.getAsteroidById)
    this.router.post('/create/', this.verToken.validateToken, this.verToken.staffUser, this.asteroidsController.addAsteroid)
    this.router.patch('/update/:_id/', this.verToken.validateToken, this.verToken.staffUser, this.asteroidsController.updateAsteroid)
    this.router.delete('/delete/:_id/', this.verToken.validateToken, this.verToken.staffUser, this.asteroidsController.deleteAsteroid)
  }
}
