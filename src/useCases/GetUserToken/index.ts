import GetUserTokenController from "./GetUserTokenController";
import GetUserTokenUseCase from "./GetUserTokenUseCase";
import MongoDBUsersRepository from "../../repositories/implementations/mongo/MongoDBUsersRespository";

const mongoDBUsersRespository = new MongoDBUsersRepository();
const getUserTokenUseCase = new GetUserTokenUseCase(mongoDBUsersRespository);
const getUserTokenController = new GetUserTokenController(getUserTokenUseCase);

export { getUserTokenController };
