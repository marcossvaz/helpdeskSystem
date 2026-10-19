import { Router } from "express";
import { AuditLogController } from "../controller/AuditLogController.js";

export const auditLogRoutes = Router();
export const auditLogRoute = new AuditLogController();


auditLogRoutes.post('/auditLog', auditLogRoute.create);