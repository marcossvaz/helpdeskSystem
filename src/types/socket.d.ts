import type { Socket } from "socket.io";
import type { AgentStatus, Role, UserStatus } from "../generated/prisma/enums.ts";

export interface SocketUser {
    id: string;
    email: string;
    name: string;
    role: Role;
    status: UserStatus;
    agentStatus?: AgentStatus | null;
}

export interface SocketData extends Socket{
    user: SocketUser;
}