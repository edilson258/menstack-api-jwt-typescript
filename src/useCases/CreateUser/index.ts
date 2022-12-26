import CreateUserController from "./CreateUserController";
import CreateUserUseCase from "./CreateUserUseCase";
import MongoDBUsersRepository from "../../repositories/implementations/mongo/MongoDBUsersRespository";

const mongoDBUsersRepository = new MongoDBUsersRepository();
const createUserUseCase = new CreateUserUseCase(mongoDBUsersRepository);
const createUserController = new CreateUserController(createUserUseCase);

export { createUserController };
