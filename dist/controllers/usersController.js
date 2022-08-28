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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../schemas/user"));
class UserController {
    // SignUp
    addUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password } = req.body;
            if (!username || !password) {
                return res.status(400).json({ error: 'username and password are rquired' });
            }
            if (yield user_1.default.findOne({ username: username })) {
                return res.status(400).json({ error: 'username already exists' });
            }
            const user = yield user_1.default.create({
                username: username,
                password: yield bcryptjs_1.default.hash(password, yield bcryptjs_1.default.genSalt()),
                staff: true
            });
            const token = signToken(user._id.toString());
            if (token === null) {
                return res.status(500).json({ error: 'Internal server error' });
            }
            return res.status(201).json({ token });
        });
    }
    // Login
    getToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password } = req.body;
            const user = yield user_1.default.findOne({ username: username });
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            if (!(yield bcryptjs_1.default.compare(password, user.password))) {
                return res.status(403).json({ error: 'Wrong credentials' });
            }
            const token = signToken(user._id.toString());
            return res.status(200).json({ token });
        });
    }
}
exports.default = UserController;
function signToken(_id) {
    return jsonwebtoken_1.default.sign({ _id: _id }, process.env.JWT_SECRET || 'default', { expiresIn: "30d" });
}
