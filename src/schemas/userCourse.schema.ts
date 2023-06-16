import {z} from "zod"

const userCourse = z.object({
    id: z.number().positive(),
    active: z.boolean().default(() => true),
    userId: z.number().positive(),
    courseId: z.number().positive()
})

const getCourseId = userCourse.omit({id:true, active:true,userId:true})

const userCourseStudent = z.object({
    userId: z.number().positive(),
    userName: z.string().max(50),
    courseId: z.number().positive(),
    courseName: z.string().max(15),
    courseDescription: z.string(),
    userActiveInCourse: z.boolean()
})



export {userCourse, getCourseId, userCourseStudent}