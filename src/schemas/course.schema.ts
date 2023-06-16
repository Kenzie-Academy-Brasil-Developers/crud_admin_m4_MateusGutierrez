import {z} from "zod"

const course = z.object({
    id:z.number().positive(),
    name: z.string().max(15),
    description: z.string()
})

const courseCreate = course.omit({id:true})
const courseUpdate = courseCreate.partial()
const courseRead = course.array()

export {course,courseCreate,courseRead,courseUpdate}