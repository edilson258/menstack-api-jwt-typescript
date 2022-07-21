import { Router } from 'express'
import AsteroidsController from '../controllers/asteroidsController'

export default class AsteroidRouter {

  public router: Router
  private asteroidsController: AsteroidsController

  constructor() {
    this.router = Router()
    this.asteroidsController = new AsteroidsController()
    this.routes()
  }

  private routes(): void {
    this.router.get('/', this.asteroidsController.listAsteroids)
    this.router.get('/:_id/', this.asteroidsController.getAsteroidById)
    this.router.post('/create/', this.asteroidsController.addAsteroid)
    this.router.patch('/update/:_id/', this.asteroidsController.updateAsteroid)
    this.router.delete('/delete/:_id/', this.asteroidsController.deleteAsteroid)
  }
}
