"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../../../entities/User"));
const models_1 = require("./models");
const MongoDatabaseConnection_1 = __importDefault(require("./MongoDatabaseConnection"));
new MongoDatabaseConnection_1.default().connect();
class MongoDBUsersRepository {
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const userData = yield models_1.usersModel.findOne({ email });
            if (!userData)
                return null;
            const user = new User_1.default({
                username: userData === null || userData === void 0 ? void 0 : userData.username,
                email: userData === null || userData === void 0 ? void 0 : userData.email,
                password: userData === null || userData === void 0 ? void 0 : userData.password,
            }, userData === null || userData === void 0 ? void 0 : userData.id);
            return user;
        });
    }
    save(user) {
        return __awaiter(this, void 0, void 0, function* () {
            yield models_1.usersModel.create({
                id: user.id,
                username: user.username,
                email: user.email,
                password: user.password,
            });
        });
    }
}
exports.default = MongoDBUsersRepository;
