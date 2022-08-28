"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const morgan_1 = __importDefault(require("morgan"));
const asteroidsRouter_1 = __importDefault(require("./routes/asteroidsRouter"));
const usersRouter_1 = __importDefault(require("./routes/usersRouter"));
dotenv_1.default.config({ debug: true });
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.database();
        this.middlewares();
        this.routes();
    }
    config() {
        this.app.set('port', process.env.PORT || 3000);
    }
    database() {
        mongoose_1.default.connect(process.env.DATABASE_URL || '');
        let connection = mongoose_1.default.connection;
        connection.on('error', console.error.bind(console, 'connection error:'));
        connection.once('open', function () {
            console.log("Database connected");
        });
    }
    middlewares() {
        this.app.use(express_1.default.json());
        this.app.use((0, morgan_1.default)('dev'));
    }
    routes() {
        this.app.use('/', new asteroidsRouter_1.default().router);
        this.app.use('/users/', new usersRouter_1.default().router);
    }
    start() {
        const PORT = this.app.get('port');
        this.app.listen(PORT, () => {
            console.log("API server running on port:", PORT);
        });
    }
}
exports.default = Server;
