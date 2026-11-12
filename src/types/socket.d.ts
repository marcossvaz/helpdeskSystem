import type { DefaultEventsMap, Server, Socket } from "socket.io";
import type { AgentStatus, Role, UserStatus } from "../generated/prisma/enums.ts";

export interface SocketUser {
    id: string;
    email: string;
    name: string;
    role: Role;
    status: UserStatus;
    agentStatus?: AgentStatus | null;
}

export interface SocketData {
    user: SocketUser;
}

// crie um tipo do socket já tipado com generic
export type AppSocket = Socket <
    DefaultEventsMap,
    DefaultEventsMap,
    DefaultEventsMap,
    SocketData
>;

// cria um tipo de server já tipado com generic
export type AppServer = Server<
    DefaultEventsMap,
    DefaultEventsMap,
    DefaultEventsMap,
    SocketData
>