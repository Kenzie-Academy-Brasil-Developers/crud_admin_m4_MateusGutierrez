import format from "pg-format";
import { User,UserResult,UserRead,UserCreate, Login, LoginReturn, UserReturn,UserCourseStudent } from "../interfaces";
import {client} from "../database"
import { userRead,userReturn} from "../schemas";
import { sign, verify } from "jsonwebtoken";
import { AppError } from "../error";
import { compare, hash } from "bcryptjs";
import { QueryResult } from "pg";

const createUserService = async (payload: UserCreate): Promise<UserReturn> => {
    payload.password = await hash(payload.password, 10)
    const queryFormat : string = format(
        `INSERT INTO "users" (%I) VALUES (%L) RETURNING *;`,
        Object.keys(payload),
        Object.values(payload)
    )
    const query: UserResult = await client.query(queryFormat)
    return userReturn.parse(query.rows[0])
}
const loginService = async (payload: Login): Promise<LoginReturn> => {
    const query: UserResult = await client.query(
        `SELECT * FROM "users" WHERE "email" = $1;`,
        [payload.email] 
    )
    if(query.rowCount === 0){
        throw new AppError("Wrong email/password", 401)
    }
    const user: User = query.rows[0]
    const samePassword: boolean = await compare(payload.password, user.password)
    if(!samePassword){
        throw new AppError("Wrong email/password", 401)
    }
    const token: string = sign(
        {email: user.email, admin: user.admin},
        process.env.SECRET_KEY!,
        {subject: user.id.toString(),expiresIn: 3600}
    )
    return {token}
}

const readAllUsers = async (): Promise<UserRead> => {
    const query: UserResult = await client.query(`SELECT * FROM "users";`)
    return userRead.parse(query.rows)
}

const readUserCourse = async (id:number) : Promise<UserCourseStudent[]> => {
    const queryGetCoursesId: QueryResult =  await client.query(
        `
        SELECT 
            courses.id AS "courseId",
            courses.name AS "courseName",
            courses.description AS "courseDescription",
            "userCourses".active AS "userActiveInCourse",
            users.id AS "userId",
            users.name AS "userName"
        FROM 
            courses
        JOIN
            "userCourses" ON courses.id = "userCourses"."courseId"
        JOIN 
            users ON users.id = "userCourses"."userId"
        WHERE 
            users.id = $1;
        `,
        [id]

    )
    if(queryGetCoursesId.rowCount === 0){
        throw new AppError("No course found", 404)
    }
    return queryGetCoursesId.rows

}

export {createUserService,loginService, readAllUsers, readUserCourse}