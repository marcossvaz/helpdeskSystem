export async function createAuditLog(params: {
    userId?: string;
    action: string;
    entity: string;
    entityId?: string;
    detailsMetadata?: Record<string,any>;
}) {
    return 
}