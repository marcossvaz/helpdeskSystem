import type { AgentStatus, Role, UserStatus } from "../generated/prisma/enums.ts";

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                email: string;
                name: string;
                role: Role;
                status: UserStatus;
                agentStatus?: AgentStatus | null;
            }
        }
    }
}


export {};