
export enum notificationType {
    TICKET_CREATED = 'TICKET_CREATED',
    TICKET_ASSIGNED = 'TICKET_ASSIGNED',
    NEW_MESSAGE = 'NEW_MESSAGE',
    STATUS_UPDATED = 'STATUS_UPDATED',
    SLA_WARNING = 'SLA_WARNING',
    SLA_BREACHED = 'SLA_BREACHED',

}

export interface Notification {
    userId: string;
    title: string;
    type: notificationType;
    metadata?: Record<string, any>;
    message: string
}