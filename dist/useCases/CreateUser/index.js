"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserController = void 0;
const CreateUserController_1 = __importDefault(require("./CreateUserController"));
const CreateUserUseCase_1 = __importDefault(require("./CreateUserUseCase"));
const MongoDBUsersRespository_1 = __importDefault(require("../../repositories/implementations/mongo/MongoDBUsersRespository"));
const mongoDBUsersRepository = new MongoDBUsersRespository_1.default();
const createUserUseCase = new CreateUserUseCase_1.default(mongoDBUsersRepository);
const createUserController = new CreateUserController_1.default(createUserUseCase);
exports.createUserController = createUserController;
