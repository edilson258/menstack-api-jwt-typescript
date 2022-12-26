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
const User_1 = __importDefault(require("../../entities/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class CreateUserUseCase {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    perform(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const userAlreadyExists = yield this.usersRepository.findByEmail(userData.email);
            if (userAlreadyExists) {
                throw new Error("User's email already exists.");
            }
            // hashing the password before saving
            userData.password = yield bcryptjs_1.default.hash(userData.password, yield bcryptjs_1.default.genSalt());
            const user = new User_1.default(Object.assign({}, userData));
            yield this.usersRepository.save(user);
            return user.getToken();
        });
    }
}
exports.default = CreateUserUseCase;
