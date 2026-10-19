import z from "zod";

export const createAuditLogSchema = z.object({
    userId: z.string().optional(),
    action: z.string().min(2, "Ação deve ser colocada"),
    entity: z.string().min(2, "Quala entidade"),
    entityId: z.string().min(2, "Qual o ID da entidade ?"),
    detailsMetadata: z.record(z.string(), z.json()).optional()
})



// -------- TYPES ----------:
export type ICreateAuditLogSchema = z.infer<typeof createAuditLogSchema>;