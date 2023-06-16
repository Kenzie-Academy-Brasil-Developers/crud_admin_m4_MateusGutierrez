import { Router } from "express";
import {createUserController,loginUserController,readUserController,readUserCoursesController} from "../controllers/index"
import { validateUserBody, validateUserEmail, verifyToken, verifyUserPermission } from "../middlewares/index";
import { login, userCreate } from "../schemas";
const userRouter: Router = Router()

userRouter.post('/users', validateUserBody(userCreate),validateUserEmail,createUserController)
userRouter.post('/login', validateUserBody(login),loginUserController)
userRouter.get('/users', verifyToken,verifyUserPermission,readUserController)
userRouter.get('/users/:id/courses',verifyToken,verifyUserPermission,readUserCoursesController)

export {userRouter}