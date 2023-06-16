import  format  from "pg-format";
import { Course, CourseCreate,CourseResult, UserCourseStudent} from "../interfaces";
import { client } from "../database";
import { course, userCourseStudent} from "../schemas";
import { QueryResult } from "pg";
import { AppError } from "../error";

const createCourseService = async (payload: CourseCreate): Promise<Course> => {
    const queryFormat: string = format(
        `INSERT INTO "courses" (%I) VALUES (%L) RETURNING *;`,
        Object.keys(payload),
        Object.values(payload)
    )
    const query: CourseResult = await client.query(queryFormat)
    return course.parse(query.rows[0])
}

const readCoursesService = async (): Promise<Course[]> => {
    const query: CourseResult = await client.query(`SELECT * FROM "courses";`)
    return query.rows
}

const addCourseService = async (courseId: number, userId: number): Promise<object> => {
    const queryCourse: QueryResult = await client.query(
        `SELECT * FROM "courses" WHERE "id" = $1`, [courseId]
    )
    const queryUser: QueryResult = await client.query(
        `SELECT * FROM "users" WHERE "id" = $1`, [userId]
    )

    if(queryCourse.rowCount === 0){
        throw new AppError("User/course not found", 404)
    }
    if(queryUser.rowCount === 0){
        throw new AppError("User/course not found", 404)
    }
    
    await client.query(
        `INSERT INTO "userCourses" ("userId","courseId") VALUES ($1,$2);`,
        [userId, courseId]
    )
    const result ={
        "message": "User successfully vinculed to course"
    }
    return result
}
const setActiveFalse = async (courseId: number, userId: number): Promise<void> => {
    const queryCourse: QueryResult = await client.query(
        `SELECT * FROM "courses" WHERE "id" = $1`, [courseId]
    )
    const queryUser: QueryResult = await client.query(
        `SELECT * FROM "users" WHERE "id" = $1`, [userId]
    )

    if(queryCourse.rowCount === 0){
        throw new AppError("User/course not found",404)
    }
    if(queryUser.rowCount === 0){
        throw new AppError("User/course not found",404)
    }
    
    await client.query(
        `
        UPDATE 
            "userCourses"
        SET 
            "active" = FALSE
        WHERE
            "courseId" = $1 AND "userId" = $2;
        `, [courseId, userId]
    )
}

const showAllStudents = async (id: number): Promise<UserCourseStudent[]> => {
    const query: QueryResult = await client.query(
        `
        SELECT 
            users.id AS "userId",
            users.name AS "userName",
            courses.id AS "courseId",
            courses.name AS "courseName",
            courses.description AS "courseDescription",
            "userCourses".active AS "userActiveInCourse"
        FROM 
            users
        JOIN
            "userCourses" ON users.id = "userCourses"."userId"
        JOIN 
            courses ON courses.id = "userCourses"."courseId"
        WHERE 
            courses.id = $1;
 
        `,[id]
    )
    if(query.rowCount === 0){
        throw new AppError("User/course not found",404)
    }
    return query.rows 
}

export {showAllStudents,createCourseService, readCoursesService, addCourseService, setActiveFalse}