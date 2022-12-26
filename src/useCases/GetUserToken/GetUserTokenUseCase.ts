import IUsersRepository from "../../repositories/IUsersRepository";
import IGetUserTokenDTO from "./GetUserTokenDTO";
import bcryptjs from "bcryptjs";

export default class GetUserTokenUseCase {
  private usersRepository: IUsersRepository;

  constructor(usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository;
  }

  async perform(userData: IGetUserTokenDTO) {
    const user = await this.usersRepository.findByEmail(userData.email);

    // check if user exists
    if (!user) {
      throw new Error("Invalid credentials.");
    }

    // check if the provided password is correct
    if (!(await bcryptjs.compare(userData.password, user.password))) {
      throw new Error("Invalid credentials.");
    }

    return user.getToken()
  }
}
