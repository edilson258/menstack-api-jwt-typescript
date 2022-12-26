"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserTokenController = void 0;
const GetUserTokenController_1 = __importDefault(require("./GetUserTokenController"));
const GetUserTokenUseCase_1 = __importDefault(require("./GetUserTokenUseCase"));
const MongoDBUsersRespository_1 = __importDefault(require("../../repositories/implementations/mongo/MongoDBUsersRespository"));
const mongoDBUsersRespository = new MongoDBUsersRespository_1.default();
const getUserTokenUseCase = new GetUserTokenUseCase_1.default(mongoDBUsersRespository);
const getUserTokenController = new GetUserTokenController_1.default(getUserTokenUseCase);
exports.getUserTokenController = getUserTokenController;
