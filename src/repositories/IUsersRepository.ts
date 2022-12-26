import User from "../entities/User";

export default interface IUsersRepository {
  findByEmail(email: string): Promise<User | null>;
  save(user: User): Promise<void>;
}
