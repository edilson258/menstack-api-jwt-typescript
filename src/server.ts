import Express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import morgan from 'morgan'

dotenv.config({ debug: true })

export default class Server {

  private app: Express.Application
  constructor() {
    this.app = Express()
    this.config()
    this.database()
    this.middlewares()
    this.routes()
  }

  private config(): void {
    this.app.set('port', process.env.PORT || 3000);
  }

  private database(): void {
    mongoose.connect(process.env.DATABASE_URL_DEV || '')
    let connection = mongoose.connection
    connection.on('error', console.error.bind(console, 'connection error:'))
    connection.once('open', function() {
      console.log("Database connected")
    })
  }

  private middlewares(): void {
    this.app.use(Express.json())
    this.app.use(morgan('dev'))
  }

  private routes(): void {
    this.app.get('/', (req, res) => {
      res.status(200).json({ message: "API" })
    })
  }

  public start(): void {
    const PORT = this.app.get('port')
    this.app.listen(PORT, () => {
      console.log("API server running on port:", PORT) 
    })
  }
}
