import { prisma } from "../lib/prisma.js";
import type { User } from "../model/User.js";

export class UserRepository{
    async create(data: User) {
        return await prisma.user.create({
            data : {
                name: data.name,
                email: data.email,
                password: data.password,
                role: data.role,
            },
            include: {assignedTickets: true, }
        })
    }

    async findByEmail(email: string) {
        return await prisma.user.findUnique({
            where: {
                email
            }
        })
    }

    async findById (id: string) {
        return await prisma.user.findUnique({
            where: {
                id
            }, include: {assignedTickets: true}
        })
    }
}