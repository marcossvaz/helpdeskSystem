import z, { email } from "zod";


export const loginSchema = z.object({
    email: z.email("o email deve ser mencionado: EX: fulano@gmail.com"),
    password: z.string().min(2, "Senha dever ser adidcionado"),
})



// ======================== TYPES ==================
export type ILoginInput = z.infer<typeof loginSchema>;