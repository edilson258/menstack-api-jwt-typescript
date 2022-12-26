import { Router } from "express";
import { createUserController } from "../useCases/CreateUser";
import { getUserTokenController } from "../useCases/GetUserToken";

export default class UsersRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  private routes(): void {
    this.router.post("/signup/", (request, response) =>
      createUserController.handle(request, response)
    );
    this.router.post("/login/", (request, response) =>
      getUserTokenController.handle(request, response)
    );
  }
}
