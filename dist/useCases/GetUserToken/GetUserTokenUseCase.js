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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class GetUserTokenUseCase {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    perform(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.usersRepository.findByEmail(userData.email);
            // check if user exists
            if (!user) {
                throw new Error("Invalid credentials.");
            }
            // check if the provided password is correct
            if (!(yield bcryptjs_1.default.compare(userData.password, user.password))) {
                throw new Error("Invalid credentials.");
            }
            return user.getToken();
        });
    }
}
exports.default = GetUserTokenUseCase;
