
export const notificationType = [
    'TICKET_CREATED',
    'TICKET_ASSIGNED',
    'NEW_MESSAGE',
    'STATUS_UPDATED',
    'SLA_WARNING',
    'SLA_BREACHED',
] as const

type notification = (typeof notificationType[number])



export interface Notification {
    userId: string;
    title: string;
    type: notification;
    metadata?: Record<string, any>;
    message: string
}