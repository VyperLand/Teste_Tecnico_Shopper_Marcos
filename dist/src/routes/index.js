"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const measureRoute_1 = __importDefault(require("./measureRoute"));
const defaultRoute = (app) => {
    app.use(body_parser_1.default.json({ limit: '50mb' }), measureRoute_1.default);
};
exports.default = defaultRoute;
