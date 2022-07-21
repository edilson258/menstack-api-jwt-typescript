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

  // get Asteroid by ID (_id)
  public async getAsteroidById(req: Request, res: Response): Promise<Response> {
    try{
      const { _id } = req.params
      if(!_id) {
        return res.status(400).json({ error: 'Provide an ID' })
      }
      const asteroid = await Asteroid.findById(_id)
      if(!asteroid) {
        return res.status(404).json({ error: 'Asteroid not found' })
      }
      return res.status(200).json({ asteroid })
    } catch(err) {
      console.error(err)
      return res.status(500).json({ error: 'Internal server error' })
    }
  }

  // Update asteroid
  public async updateAsteroid(req: Request, res: Response): Promise<Response> {
    const { _id } = req.params
    const { name, year } = req.body
    
    if(!_id) {
      return res.status(400).json({ error: 'Prove an _id to update' })
    }

    if(!name || !year) {
      return res.status(400).json({ error: 'Name and Year are required to update' })
    }

    try{
      if(!await Asteroid.findById(_id)) {
        return res.status(404).json({ error: 'Asteroid not found' })
      }
      await Asteroid.findByIdAndUpdate(_id, {
        $set: {
          name: name,
          year: year
        }
      }).exec()
      return res.status(200).json({ message: 'Asteroid updated' })
    } catch(err) {
      console.error(err)
      return res.status(500).json({ error: 'Internal server error' })
    }
  }

  // DELETE an Asteroid
  public async deleteAsteroid(req: Request, res: Response): Promise<Response> {
    try{
      const { _id } = req.params
      if(!await Asteroid.findById(_id)) {
        return res.status(404).json({ error: 'Asteroid not found' })
      }
      await Asteroid.findByIdAndDelete(_id)
      return res.status(200).json({ message: 'Asteroid deleted' })
    } catch(err) {
      console.error(err)
      return res.status(500).json({ error: 'Internal server error' })
    }
  }
}
