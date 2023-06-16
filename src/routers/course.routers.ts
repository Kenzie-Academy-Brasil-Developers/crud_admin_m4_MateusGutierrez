import { Router } from "express";
import {createCourseController,readCourseById,readCourses,destroyCourse,addCourseController} from '../controllers/index'
import { validateUserBody, verifyToken, verifyUserPermission } from "../middlewares";
import { courseCreate } from "../schemas";
const courseRouter: Router = Router()

courseRouter.post('',verifyToken,verifyUserPermission,validateUserBody(courseCreate),createCourseController)
courseRouter.get('', readCourses)
courseRouter.post('/:courseId/users/:userId', verifyToken,verifyUserPermission,addCourseController)
courseRouter.delete('/:courseId/users/:userId',verifyToken,verifyUserPermission, destroyCourse)
courseRouter.get('/:id/users',verifyToken,verifyUserPermission,readCourseById)

export {courseRouter}