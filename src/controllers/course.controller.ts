import { Request, Response } from "express";
import { addCourseService, createCourseService, readCoursesService, setActiveFalse, showAllStudents } from "../services";
import { CourseRead } from "../interfaces";


const createCourseController = async (req: Request, res: Response): Promise<Response> => {
    const payload = req.body
    const newCourse = await createCourseService(payload)
    return res.status(201).json(newCourse)
}
const readCourses = async (req: Request, res: Response): Promise<Response> => {
    const readCourses : CourseRead = await readCoursesService()
    return res.status(200).json(readCourses)
}
const addCourseController = async (req: Request, res: Response): Promise<Response> => {
    const courseId = Number(req.params.courseId)
    const userId = Number(req.params.userId)
    const addCourse = await addCourseService(courseId, userId)
    return res.status(201).json(addCourse)
}
const destroyCourse = async (req: Request, res: Response): Promise<Response> => {
    const courseId = Number(req.params.courseId)
    const userId = Number(req.params.userId)
    const destroy = await setActiveFalse(courseId, userId)
    return res.status(204).json(destroy)
}
const readCourseById = async (req: Request, res: Response): Promise<Response> => {
    const id = Number(req.params.id)
    const getAllStudents = await showAllStudents(id)
    console.log(getAllStudents)
    return res.status(200).json(getAllStudents)
}
export {createCourseController,readCourseById,readCourses,destroyCourse,addCourseController}
