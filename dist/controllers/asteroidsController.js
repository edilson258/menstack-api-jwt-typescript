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
const asteroid_1 = __importDefault(require("../schemas/asteroid"));
class AsteroidsController {
    // CREATE Asteroid
    addAsteroid(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, year } = req.body;
            if (!name || !year) {
                return res.status(400).json({ error: 'Name and Year are required' });
            }
            try {
                if (yield asteroid_1.default.findOne({ name: name })) {
                    return res.status(400).json({ error: 'Asteroid already exists' });
                }
                const asteroid = yield asteroid_1.default.create({ name: name, year: year });
                return res.status(201).json({ message: 'Asteroid created', _id: asteroid._id });
            }
            catch (err) {
                console.error(err);
                return res.status(500).json({ error: 'Internal server error' });
            }
        });
    }
    // LIST all Asteroids
    listAsteroids(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const asteroids = yield asteroid_1.default.find();
                return res.status(200).json({ asteroids });
            }
            catch (err) {
                console.error(err);
                return res.status(500).json({ error: 'Internal server error' });
            }
        });
    }
    // get Asteroid by ID (_id)
    getAsteroidById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { _id } = req.params;
                if (!_id) {
                    return res.status(400).json({ error: 'Provide an ID' });
                }
                const asteroid = yield asteroid_1.default.findById(_id);
                if (!asteroid) {
                    return res.status(404).json({ error: 'Asteroid not found' });
                }
                return res.status(200).json({ asteroid });
            }
            catch (err) {
                console.error(err);
                return res.status(500).json({ error: 'Internal server error' });
            }
        });
    }
    // Update asteroid
    updateAsteroid(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { _id } = req.params;
            const { name, year } = req.body;
            if (!_id) {
                return res.status(400).json({ error: 'Prove an _id to update' });
            }
            if (!name || !year) {
                return res.status(400).json({ error: 'Name and Year are required to update' });
            }
            try {
                if (!(yield asteroid_1.default.findById(_id))) {
                    return res.status(404).json({ error: 'Asteroid not found' });
                }
                yield asteroid_1.default.findByIdAndUpdate(_id, {
                    $set: {
                        name: name,
                        year: year
                    }
                }).exec();
                return res.status(200).json({ message: 'Asteroid updated' });
            }
            catch (err) {
                console.error(err);
                return res.status(500).json({ error: 'Internal server error' });
            }
        });
    }
    // DELETE an Asteroid
    deleteAsteroid(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { _id } = req.params;
                if (!(yield asteroid_1.default.findById(_id))) {
                    return res.status(404).json({ error: 'Asteroid not found' });
                }
                yield asteroid_1.default.findByIdAndDelete(_id);
                return res.status(200).json({ message: 'Asteroid deleted' });
            }
            catch (err) {
                console.error(err);
                return res.status(500).json({ error: 'Internal server error' });
            }
        });
    }
}
exports.default = AsteroidsController;
