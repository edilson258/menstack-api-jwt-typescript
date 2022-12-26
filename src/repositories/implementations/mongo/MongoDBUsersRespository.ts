import User from "../../../entities/User";
import IUsersRepository from "../../IUsersRepository";
import { usersModel } from "./models";
import MongoDatabaseConnection from "./MongoDatabaseConnection";

new MongoDatabaseConnection().connect();

export default class MongoDBUsersRepository implements IUsersRepository {
  async findByEmail(email: string): Promise<User | null> {
    const userData = await usersModel.findOne({ email });
    if (!userData) return null;
    const user = new User(
      {
        username: userData?.username,
        email: userData?.email,
        password: userData?.password,
      },
      userData?.id
    );
    return user;
  }

  async save(user: User): Promise<void> {
    await usersModel.create({
      id: user.id,
      username: user.username,
      email: user.email,
      password: user.password,
    });
  }
}
