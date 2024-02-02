/** @format */

import { createHash, createDecipheriv, createCipheriv } from "crypto"
import { configs } from "../utils/config"

export const createHash215 = (value: string) => {
    const Hash = createHash("sha512")
    return Hash.update(value, "utf-8").digest("hex")
}

export const decrytData = (message: string) => {
    const decipher = createDecipheriv(
        "aes-128-cbc",
        Buffer.from(String(configs.ENCRYPTIONKEY)).subarray(0, 16),
        Buffer.from(configs.ENCRYPTIONIV as string, "hex")
    )
    let decryptedMessage = decipher.update(Buffer.from(message, "hex"))
    decryptedMessage = Buffer.concat([decryptedMessage, decipher.final()])
    return decryptedMessage.toString()
}

export const encryptData = (message: string) => {
    let result
    try {
        const cipher = createCipheriv(
            "aes-128-cbc",
            Buffer.from(String(configs.ENCRYPTIONKEY)).subarray(0, 16),
            Buffer.from(configs.ENCRYPTIONIV as string, "hex")
        )
        let encryptedMessage = cipher.update(message)
        encryptedMessage = Buffer.concat([encryptedMessage, cipher.final()])
        result = encryptedMessage.toString("hex")
    } catch (error) {
        result = ""
    }
    return result
}
