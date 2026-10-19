import type { ICreateAuditLogSchema } from "../controller/schemas/AuditLogSchema.js";
import type { AuditLogRepositry } from "../repository/AuditLogRepositry.js";

export class AuditLogService {

    constructor(private readonly _auditLogRepository: AuditLogRepositry) {}

    async create(data: ICreateAuditLogSchema) {
        return await this._auditLogRepository.create(data)
    }
}