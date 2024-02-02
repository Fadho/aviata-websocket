/** @format */

import { randomInt } from 'crypto';
import { encryptData } from "../hashings"
import { CreateErr } from "../../../types"

export const catchError: CreateErr = (
    message,
    code = 403,
    validations = undefined
) => {
    const err = new Error(message)
    // @ts-ignore
    err.code = code
    // @ts-ignore
    err.validations = validations
    return err
}

export const success = (msg: string, data: any, meta?: object) => ({
    data: encryptData(JSON.stringify(data)),
    status: true,
    message: msg,
    ...(meta && { meta }),
})

export const createReference = (title: string) => {
    return `${title}.${randomInt(1000000, 9999999)}-${new Date().getTime()}`
}

export const getRndInteger = (min:number,max:number) => {
    const fortuna = require('javascript-fortuna');
    fortuna.init();
    return (fortuna.random() * (max - min + 1)) + min;
}
