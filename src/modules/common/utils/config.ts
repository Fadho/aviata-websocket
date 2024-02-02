/** @format */

export const validateEnvs = (values: string[]) => {
    return values.map(value => {
        if (typeof process.env[value] !== "string") {
            throw new Error(`Add ${value} to env`)
        }
        return value
    })
}

const getEnv = (key: string) => String(process.env[key])

export const configs = {
    PORT: getEnv("PORT"),
    NODE_ENV: getEnv("NODE_ENV"),
    ENCRYPTIONIV: getEnv("ENCRYPTIONIV"),
    ENCRYPTIONKEY: getEnv("ENCRYPTIONKEY"),
}

validateEnvs(Object.keys(configs))
