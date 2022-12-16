import express from "express";
import expressJSDocSwagger from "express-jsdoc-swagger";
import { swaggerOptions } from "./swagger-options.js";
import mongoose  from "mongoose";
import config from "./config.js";
import { routerApi } from "./routers/api.router.js";

console.log(config);

mongoose.set('strictQuery', true);
mongoose.connect('mongodb+srv://lucien:12122001@cluster0.shjnqcf.mongodb.net/?retryWrites=true&w=majority')
    .then(() => console.log('Connexion to mongo successful'))
    .catch(() => console.log(err))

const app = express()

app.use(express.json())

// app.use(cors({
//     origin: '*',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     prelightContinue: false,
//     optionsSuccessStatus: 200,
// }))

expressJSDocSwagger(app)(swaggerOptions)

app.use('/api', routerApi)

app.listen(parseInt(config.port), console.log("Listening on port " + config.port));