import z from "zod";


export const ticketCategorySchema = z.object({
    name: z.string().min(2, "O nome da categórias é obrigatório"),
    description: z.string().optional()
})


export type ITicketCategorySchema = z.infer<typeof ticketCategorySchema>;