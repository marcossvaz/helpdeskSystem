import { prisma } from "../lib/prisma.js";

export async function createAuditLog(params: {
    userId?: string;
    action: string;
    entity: string;
    entityId: string;
    detailsMetadata?: Record<string, any>;
}) {
    return prisma.auditLog.create({
        data: {
            userId: params.userId,
            action: params.action,
            entity: params.entity,
            entityId: params.entityId,
            detailsMetadata: params.detailsMetadata
        }
    })
}