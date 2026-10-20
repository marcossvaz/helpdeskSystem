import bcrypt from "bcrypt"
import { env } from "../config/env.js"


export const generateHash = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, env.SALT_ROUND);
}

export const compare = async (password: string, passwordBD: string): Promise<Boolean> => {
    return await bcrypt.compare(password, passwordBD);
}