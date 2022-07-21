import { Router } from 'express'

export default class AsteroidRouter {

  public router: Router
  constructor() {
    this.router = Router()
    this.routes()
  }

  private routes(): void {
    this.router.get('/', (req, res) => {
      return res.status(200).json({ message: 'Inside asteroids router' })
    })
  }
}
