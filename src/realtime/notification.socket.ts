// realtime/agent.handlers.ts
import { z } from "zod";
import { logger } from "../config/logger.js";
import type { UserService } from "../service/UserService.js";
import type { AppSocket } from "../types/socket.js";

type Ack = (result: { ok: boolean; error?: string }) => void;

// ttpe
const AGENT_STATUSES = ["AVAILABLE", "BUSY", "OFFLINE"] as const;
const statusSchema = z.object({ status: z.enum(AGENT_STATUSES) });

export function registerAgentHandlers(socket: AppSocket, userService: UserService) {
    socket.on("update_agent_status", async (data: unknown, ack?: Ack) => {
        try {
            const { id: userId, role } = socket.data.user;

            if (!["AGENT", "TEAM_LEAD"].includes(role)) {
                return ack?.({ ok: false, error: "Sem permissão" });
            }

            const parsed = statusSchema.safeParse(data);
            if (!parsed.success) {
                return ack?.({ ok: false, error: "Status inválido" });
            }

            const { status } = parsed.data;

            await userService.updateAgentStatus(userId, status);

            // mantém o socket em sincronia com o banco
            socket.data.user.agentStatus = status;

            socket.to("staff").emit("agent_status_changed", { userId, agentStatus: status });

            ack?.({ ok: true });
        } catch (err) {
            logger.error({ err }, "Error updating agent status");
            ack?.({ ok: false, error: "Não foi possível atualizar o status" });
        }
    });
}