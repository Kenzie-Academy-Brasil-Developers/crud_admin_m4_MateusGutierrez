import { NextFunction, Request, Response } from "express";
import { ZodTypeAny } from "zod";

const validateUserBody = (schema: ZodTypeAny) => (req: Request, res: Response, next: NextFunction): void => {
        const validatedUser = schema.parse(req.body)
        res.locals = {...res.locals, validatedUser}
        req.body = validatedUser
    return next() 
}

export {validateUserBody}