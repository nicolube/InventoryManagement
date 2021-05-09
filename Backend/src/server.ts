import cookieParser from 'cookie-parser';
import express from 'express'
import bearerToken from 'express-bearer-token';
import cors from 'cors'
import * as cn  from './data/controller_handler'
import * as dbm  from './data/database_manager'

const app = express();


app.use(bearerToken()).use(cookieParser()).use(express.json()).use(cors())

dbm.initDB()
cn.init(app)

app.listen(4100, () => console.log('Listening on Port http://localhost:4100'));