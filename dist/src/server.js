"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
// import cors from 'cors';
require("dotenv/config");
require("reflect-metadata");
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
app.use('/images', express_1.default.static('./temp_img'));
const port = process.env.PORT || 3000;
const server = http_1.default.createServer(app);
//Definindo as rotas
(0, routes_1.default)(app);
server.listen(port, () => console.log(`Server listening on port ${port}`));
