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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../schemas/user"));
class VerifyToken {
    validateToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = getToken(req.headers.authorization);
            if (token === null) {
                return res.sendStatus(403);
            }
            try {
                jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'default');
            }
            catch (err) {
                console.log(err);
                return res.sendStatus(403);
            }
            return next();
        });
    }
    staffUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = getToken(req.headers.authorization);
            if (!token) {
                return res.sendStatus(403);
            }
            const user = yield user_1.default.findById(jsonwebtoken_1.default.decode(token));
            if (!(user === null || user === void 0 ? void 0 : user.staff)) {
                return res.sendStatus(403);
            }
            return next();
        });
    }
}
exports.default = VerifyToken;
function getToken(authHeader) {
    if (!authHeader) {
        return null;
    }
    const bearerToken = authHeader.split(' ');
    if (bearerToken.length !== 2) {
        return null;
    }
    if (bearerToken[0] !== 'Bearer') {
        return null;
    }
    return bearerToken[1];
}
