import "express-async-errors"
import "dotenv/config"
import express, { Application, json } from 'express'
import { courseRouter, userRouter } from './routers'
import { errorHanlderMiddleware } from './middlewares'

const app: Application = express()
app.use(json())

app.use('',userRouter)
app.use('/courses', courseRouter)

app.use(errorHanlderMiddleware)
export default app
