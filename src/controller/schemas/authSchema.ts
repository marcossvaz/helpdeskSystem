import z, { email } from "zod";

export const registerSchema = z.object({
    name: z.string().min(2, "Nome deve ser adicionado"),
    email: z.email("o email deve ser mencionado: EX: fulano@gmail.com"),
    password: z.string().min(2, "Senha dever ser adidcionado"),
})

export const loginSchema = z.object({
    email: z.email("o email deve ser mencionado: EX: fulano@gmail.com"),
    password: z.string().min(2, "Senha dever ser adidcionado"),
})


// ======================== TYPES ==================
export type IRegisterInput = z.infer<typeof registerSchema>;
export type ILoginInput = z.infer<typeof loginSchema>;