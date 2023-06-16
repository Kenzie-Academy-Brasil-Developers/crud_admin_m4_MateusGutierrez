import {z} from "zod"
import { login, user, userCreate, userRead, userReturn,} from "../schemas"
import { QueryResult } from "pg"


type User = z.infer<typeof user>
type Login = z.infer<typeof login>
type LoginReturn = {token: string}
type UserReturn = z.infer<typeof userReturn>
type UserCreate = z.infer<typeof userCreate>
type UserRead = z.infer<typeof userRead>


type UserResult = QueryResult<User>

export {User, UserCreate, UserRead
    , UserResult, Login,LoginReturn, UserReturn}