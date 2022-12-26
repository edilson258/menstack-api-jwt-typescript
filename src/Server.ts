import Express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import AsteroidsRouter from "./routes/asteroidsRouter";
import UsersRouter from "./routes/UsersRouter";

dotenv.config({ debug: true, path: "./.env" });

export default class Server {
  private app: Express.Application;
  constructor() {
    this.app = Express();
    this.config();
    this.middlewares();
    this.routes();
  }

  private config(): void {
    this.app.set("port", process.env.PORT || 3000);
  }

  private middlewares(): void {
    this.app.use(Express.json());
    this.app.use(morgan("dev"));
  }

  private routes(): void {
    this.app.use("/", new AsteroidsRouter().router);
    this.app.use("/users/", new UsersRouter().router);
  }

  public start(): void {
    const PORT = this.app.get("port");
    this.app.listen(PORT, () => {
      console.log("API server running on port:", PORT);
    });
  }
}
