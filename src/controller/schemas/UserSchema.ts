import z, { email } from "zod";

export const userCreateSchema = z.object({
    name: z.string().min(2, "Digite seu nome"),
    email: z.string().min(2, "Email obrigatório"),
    password: z.string().min(2, "Senha é obrigatório")
})





// _________TYPES ________:
export type IUserCreateSchema = z.infer<typeof userCreateSchema>;