"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const asteroidsController_1 = __importDefault(require("../controllers/asteroidsController"));
const verToken_1 = __importDefault(require("../middlewares/verToken"));
class AsteroidRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.asteroidsController = new asteroidsController_1.default();
        this.verToken = new verToken_1.default();
        this.routes();
    }
    routes() {
        this.router.get('/', this.verToken.validateToken, this.asteroidsController.listAsteroids);
        this.router.get('/:_id/', this.verToken.validateToken, this.asteroidsController.getAsteroidById);
        this.router.post('/create/', this.verToken.validateToken, this.verToken.staffUser, this.asteroidsController.addAsteroid);
        this.router.patch('/update/:_id/', this.verToken.validateToken, this.verToken.staffUser, this.asteroidsController.updateAsteroid);
        this.router.delete('/delete/:_id/', this.verToken.validateToken, this.verToken.staffUser, this.asteroidsController.deleteAsteroid);
    }
}
exports.default = AsteroidRouter;
