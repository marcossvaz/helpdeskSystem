export interface AuditLog {
    userId?: string;
    action: string;
    entity: string;
    entityId: string;
    detailsMetadata?: unknown;
}