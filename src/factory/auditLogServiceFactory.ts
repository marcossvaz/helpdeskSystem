import { AuditLogService } from "../service/auditLogService.js";
import { auditLogRepositryFactory } from "./auditLogRepositoryFactory.js";

export const auditLogServiceFactory = new AuditLogService(auditLogRepositryFactory);