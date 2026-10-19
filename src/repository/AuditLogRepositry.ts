import { prisma } from "../lib/prisma.js";
import type { AuditLog } from "../model/AuditLog.js";

export class AuditLogRepositry {

    // todo testar a rota antes de fazer o commit
    
    async create(data: AuditLog) {
        return await prisma.auditLog.create({
            data: {
                userId: data.userId,
                action: data.action,
                entity: data.entity,
                entityId: data.entityId,
                detailsMetadata: data.detailsMetadata || undefined
            }
        })
    }
}