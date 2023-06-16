import {z} from "zod"
import { userCourse,getCourseId, userCourseStudent } from "../schemas"

type UserCourse = z.infer<typeof userCourse>
type GetCourseId = z.infer<typeof getCourseId>
type UserCourseStudent = z.infer<typeof userCourseStudent>
export {UserCourse, GetCourseId, UserCourseStudent}