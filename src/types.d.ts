/** @format */

import { Request } from "express"
import { Socket } from "socket.io"

interface DefaultAttributes {
    id?: string
    deletedAt?: string
    createdAt?: string
    updatedAt?: string
}

type IToken = IUser & IAdmin

type CreateErr = (message: string, code?: number, validations?: object) => Error

type Token = IUser

declare module "express-serve-static-core" {
    export interface Request {
        user: IToken
    }
}

type AppError = Error & {
    code: number
    name?: string
    message: string
    validations?: object | null
}

type Fix = any
