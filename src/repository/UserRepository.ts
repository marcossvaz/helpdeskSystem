import { prisma } from "../lib/prisma.js";
import type { User } from "../model/User.js";

export class UserRepository{
    async create(data: User) {
        return await prisma.user.create({
            data : {
                name: data.name,
                email: data.email,
                password: data.password
            }
        })
    }
}