import User from "../../entities/User";
import IUsersRepository from "../../repositories/IUsersRepository";
import ICreateUserDTO from "./CreateUserDTO";
import bcryptjs from "bcryptjs";

export default class CreateUserUseCase {
  private usersRepository: IUsersRepository;

  constructor(usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository;
  }

  async perform(userData: ICreateUserDTO) {
    const userAlreadyExists = await this.usersRepository.findByEmail(
      userData.email
    );

    if (userAlreadyExists) {
      throw new Error("User's email already exists.");
    }

    // hashing the password before saving
    userData.password = await bcryptjs.hash(
      userData.password,
      await bcryptjs.genSalt()
    );

    const user = new User({ ...userData });

    await this.usersRepository.save(user);

    return user.getToken();
  }
}
