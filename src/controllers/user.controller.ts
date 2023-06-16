import { Request, Response } from "express"
import { createUserService, loginService, readAllUsers, readCoursesService, readUserCourse } from "../services"
import { LoginReturn, UserRead, UserReturn } from "../interfaces"

const createUserController = async (req: Request, res: Response): Promise<Response> => {
    const user = req.body
    const newUser: UserReturn = await createUserService(user)
    return res.status(201).json(newUser)
}
const loginUserController =  async (req: Request, res: Response): Promise<Response> => {
    const token: LoginReturn = await loginService(req.body)
    return res.json(token)
}
const readUserController =  async (req: Request, res: Response): Promise<Response> => {
    const users: UserRead = await readAllUsers()
    return res.status(200).json(users)
}
const readUserCoursesController =  async (req: Request, res: Response): Promise<Response> => {
    const id = Number(req.params.id)
    const getAllCourses = await readUserCourse(id)
    return res.status(200).json(getAllCourses)
}

export {createUserController,loginUserController,readUserController,readUserCoursesController}
