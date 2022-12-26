import { Request, Response } from "express";
import GetUserTokenUseCase from "./GetUserTokenUseCase";
import GetUserTokenDTO from "./GetUserTokenDTO";

export default class GetUserTokenController {
  private getUserTokenUseCase: GetUserTokenUseCase;

  constructor(getUserTokenUseCase: GetUserTokenUseCase) {
    this.getUserTokenUseCase = getUserTokenUseCase;
  }

  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const userData: GetUserTokenDTO = {
      email,
      password,
    };

    try {
      this.validateUserData(userData);
      const userAuthToken = await this.getUserTokenUseCase.perform(userData);
      return response.status(200).json({ token: userAuthToken });
    } catch (err: any) {
      return response.status(400).json({ error: err.message || "Error" });
    }
  }

  private validateUserData(userData: GetUserTokenDTO) {
    // validate user email
    function validateEmail(email: string) {
      const emailRegex =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return emailRegex.test(email);
    }
    if (!validateEmail(userData.email)) {
      throw new Error("Invalid email address.");
    }

    // validate user password
    function validatePassword(password: string) {
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
      return passwordRegex.test(password);
    }
    if (!validatePassword(userData.password)) {
      throw new Error(
        "Password must have at least 8 chars with uppercase, lowercase, numbers and special chars"
      );
    }
  }
}
