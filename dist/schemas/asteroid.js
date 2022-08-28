"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const AsteroidSchema = new mongoose_1.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    year: {
        type: String,
        required: true
    }
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Asteroid', AsteroidSchema);
