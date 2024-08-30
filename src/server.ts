import express from 'express';
import http from 'http';
// import cors from 'cors';

import 'dotenv/config';
import 'reflect-metadata';

import defaultRoute from './routes';

const app = express();

app.use('/images', express.static('./temp_img'));

const port = process.env.PORT || 3000;


const server: http.Server = http.createServer(app);

//Definindo as rotas
defaultRoute(app);


server.listen(port, ()=> console.log(`Server listening on port ${port}`));