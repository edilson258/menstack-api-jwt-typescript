import { Request, Response } from "express"
import Asteroid from "../schemas/asteroid"

export default class AsteroidsController {

  // CREATE Asteroid
  public async addAsteroid(req: Request, res: Response): Promise<Response> {
    const { name, year } = req.body
    if(!name || !year) {
      return res.status(400).json({ error: 'Name and Year are required' })
    }
    
    try {
      if(await Asteroid.findOne({ name: name })) {
        return res.status(400).json({ error: 'Asteroid already exists' })
      }
      const asteroid = await Asteroid.create({ name: name, year: year })
      return res.status(201).json({ message: 'Asteroid created', _id: asteroid._id })
    } catch(err) {
      console.error(err)
      return res.status(500).json({ error: 'Internal server error' })
    }
  }

  // LIST all Asteroids
  public async listAsteroids(req: Request, res: Response): Promise<Response> {
    try{
      const asteroids = await Asteroid.find()
      return res.status(200).json({ asteroids })
    } catch(err) {
      console.error(err)
      return res.status(500).json({ error: 'Internal server error' })
    }
  }
}
