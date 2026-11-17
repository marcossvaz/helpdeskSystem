import type { Role } from "./User.js";

export const MessageType = [
    "CUSTOMER_MESSAGE",
    "AGENT_MESSAGE",
    "INTERNAL_NOTE",
    "SYSTEM_MESSAGE"
] as const

export type MessageType = (typeof MessageType[number]);


export interface Message {
    content: string;
    type: MessageType;
    authorId: string;
    role: Role
}