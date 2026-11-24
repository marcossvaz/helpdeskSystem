export const SOCKET_EVENTS = {
    
    // client to serve
    JOIN_TICKET_ROOM: 'join_ticket_room',
    LEAVE_TICKET_ROOM: 'leave_ticket_room',
    SEND_MESSAGE: 'send_message',
    TYPING_START: 'typing_start',
    MESSAGE_SEEN: 'message_seen',
    UPDATE_AGENT_STATUS: 'update_agent_status',

    //server to client
    TICKET_CREATED: 'ticket_created',
    TICKET_ASSIGNED: 'ticket_assigned',
    TICKET_STATUS_UPDATED: 'ticket_satus_updated',
    NEW_MESSAGE: 'new_message',
    MESSAGE_DELIVERED: 'message_delivered',
    MESSAGE_SEEN_ACK: 'message_seen_ack',
    USER_ONLINE: 'user_online',
    NOTIFICATION_RECEIVED: 'notification_received',
    AGENT_STATUS_UPDATED: 'agent_status_updated'
}  as const;