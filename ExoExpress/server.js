import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import config from './config.js'
import { apiRouter } from './routers/api.router.js'
import { swaggerOptions } from './swagger-options.js'
import expressJsDocSwagger from 'express-jsdoc-swagger'

mongoose.set('strictQuery', true)
mongoose.connect('mongodb+srv://' + config.db.user + ':' + config.db.password +'@cluster0.kwvfw7g.mongodb.net/?retryWrites=true&w=majority')
        .then(() => console.log('connexion à mongo réussie'))
        .catch(err => console.log(err))

const app = express()

app.use(express.json())

expressJsDocSwagger(app)(swaggerOptions)

app.use('/api', apiRouter)

app.listen(config.port, console.log('listen ' + config.port))