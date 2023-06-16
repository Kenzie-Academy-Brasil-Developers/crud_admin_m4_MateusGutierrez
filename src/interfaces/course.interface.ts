import {z} from "zod"
import { course,courseCreate,courseRead,courseUpdate } from "../schemas"
import { QueryResult } from "pg"

type Course = z.infer<typeof course>
type CourseRead = z.infer<typeof courseRead>
type CourseCreate = z.infer<typeof courseCreate>
type CourseUpdate = z.infer<typeof courseUpdate>
type CourseResult = QueryResult<Course>


export {Course,CourseRead,CourseCreate, CourseUpdate,CourseResult}
