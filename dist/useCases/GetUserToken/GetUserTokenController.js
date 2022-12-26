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
Object.defineProperty(exports, "__esModule", { value: true });
class GetUserTokenController {
    constructor(getUserTokenUseCase) {
        this.getUserTokenUseCase = getUserTokenUseCase;
    }
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = request.body;
            const userData = {
                email,
                password,
            };
            try {
                this.validateUserData(userData);
                const userAuthToken = yield this.getUserTokenUseCase.perform(userData);
                return response.status(200).json({ token: userAuthToken });
            }
            catch (err) {
                return response.status(400).json({ error: err.message || "Error" });
            }
        });
    }
    validateUserData(userData) {
        // validate user email
        function validateEmail(email) {
            const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return emailRegex.test(email);
        }
        if (!validateEmail(userData.email)) {
            throw new Error("Invalid email address.");
        }
        // validate user password
        function validatePassword(password) {
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
            return passwordRegex.test(password);
        }
        if (!validatePassword(userData.password)) {
            throw new Error("Password must have at least 8 chars with uppercase, lowercase, numbers and special chars");
        }
    }
}
exports.default = GetUserTokenController;
