import z from "zod";

export const priorityEnum = z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT'])
export const ticketStatusEnum = z.enum(['OPEN', 'ASSIGNED', 'IN_PROGRESS', 'RESOLVED', 'REOPENED', 'CLOSED'])

export const createTicketSchema = z.object({
    title: z.string().min(2, "a causa do problema deve ser dita"),
    description: z.string().min(2, "a descrição da causa deve ser dito"),
    priority: priorityEnum.default('MEDIUM'),
    status: ticketStatusEnum.default('OPEN'),
    customerId: z.string().min(2, "Id do usuário que abriu requisição"),
    AssisgnedAgentId: z.string().optional(),
    categoryId: z.string().min(2, "Id da categoria deve ser colocado")
})

export const customerId = z.object({
    id: z.string().min(2, "id do cliente")
})


export const updateTicketStatusSchema = z.object({
    status: z.enum(['IN_PROGRESS', 'RESOLVED']),
});

export const ticketRatingSchema = z.object({
    rating: z.number().int().max(5),
    feedback: z.string().optional(),
})


export const tickerSchema = z.object({
    ticketnumber: z.string().min(2, "o número de ticket"),
    userId: z.string().min(2, "coloque o id do usuário que abriu a requisição")
})


export const ticketNumberSchema = z.object({
    ticketnumber: z.string().min(2, "o número de ticket"),

})


//______ TYPES _________:
export type ICreateTicketSchema = z.infer<typeof createTicketSchema>;