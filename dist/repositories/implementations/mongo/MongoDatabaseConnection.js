"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
class MongoDatabaseConnection {
    constructor() {
        this.connection = null;
    }
    connect() {
        var _a, _b;
        if (!this.connection) {
            mongoose_1.default.connect("mongodb://127.0.0.1:27017/menstack");
            this.connection = mongoose_1.default.connection;
        }
        (_a = this.connection) === null || _a === void 0 ? void 0 : _a.on("error", console.error.bind(console, "Mongo Database connection error:"));
        (_b = this.connection) === null || _b === void 0 ? void 0 : _b.once("open", function () {
            console.log("Mongo Database connected");
        });
    }
}
exports.default = MongoDatabaseConnection;
