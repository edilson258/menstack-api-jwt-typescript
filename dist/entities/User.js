"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class User {
    constructor(userData, id) {
        this.username = userData.username;
        this.email = userData.email;
        this.password = userData.password;
        if (!id) {
            this.id = (0, crypto_1.randomUUID)();
        }
        else {
            this.id = id;
        }
    }
    getToken() {
        return jsonwebtoken_1.default.sign(this.id, process.env.JWT_SECRET || "default");
    }
}
exports.default = User;
