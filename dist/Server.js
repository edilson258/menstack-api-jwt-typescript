"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const asteroidsRouter_1 = __importDefault(require("./routes/asteroidsRouter"));
const UsersRouter_1 = __importDefault(require("./routes/UsersRouter"));
dotenv_1.default.config({ debug: true, path: "./.env" });
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.middlewares();
        this.routes();
    }
    config() {
        this.app.set("port", process.env.PORT || 3000);
    }
    middlewares() {
        this.app.use(express_1.default.json());
        this.app.use((0, morgan_1.default)("dev"));
    }
    routes() {
        this.app.use("/", new asteroidsRouter_1.default().router);
        this.app.use("/users/", new UsersRouter_1.default().router);
    }
    start() {
        const PORT = this.app.get("port");
        this.app.listen(PORT, () => {
            console.log("API server running on port:", PORT);
        });
    }
}
exports.default = Server;
