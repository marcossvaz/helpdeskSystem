import z, { email } from "zod";

export const userCreateSchema = z.object({
    name: z.string().min(2, "Digite seu nome"),
    email: z.string().min(2, "Email obrigatório"),
    password: z.string().min(2, "Senha é obrigatório"),
    role: z.enum(['AGENT', 'TEAM_LEAD', 'ADMIN'])
})

export const userIdSchema = z.object({
    id: z.string().min(2, "O id é obrigatório")
})



// _________TYPES ________:
export type IUserCreateSchema = z.infer<typeof userCreateSchema>;
export type IUserIdSchema = z.infer<typeof userIdSchema>