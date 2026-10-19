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



//______ TYPES _________:
export type ICreateTicketSchema = z.infer<typeof createTicketSchema>;