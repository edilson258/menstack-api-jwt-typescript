"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usersController_1 = __importDefault(require("../controllers/usersController"));
class UsersRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.usersController = new usersController_1.default();
        this.routes();
    }
    routes() {
        this.router.post('/signup/', this.usersController.addUser);
        this.router.post('/login/', this.usersController.getToken);
    }
}
exports.default = UsersRouter;
