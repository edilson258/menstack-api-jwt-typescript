"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CreateUser_1 = require("../useCases/CreateUser");
const GetUserToken_1 = require("../useCases/GetUserToken");
class UsersRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.post("/signup/", (request, response) => CreateUser_1.createUserController.handle(request, response));
        this.router.post("/login/", (request, response) => GetUserToken_1.getUserTokenController.handle(request, response));
    }
}
exports.default = UsersRouter;
