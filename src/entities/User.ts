import { randomUUID } from "crypto";
import jwt from "jsonwebtoken"

export default class User {
  public readonly id: string;

  public username: string;
  public email: string;
  public password: string;

  constructor(userData: Omit<User, "id" | "getToken">, id?: string) {
    this.username = userData.username;
    this.email = userData.email;
    this.password = userData.password;

    if (!id) {
      this.id = randomUUID();
    } else {
      this.id = id;
    }
  }

  public getToken() {
    return jwt.sign(this.id, process.env.JWT_SECRET || "default")
  }
}
