import dayjs from "dayjs";
import type { TicketPriority } from "../generated/prisma/enums.js";


const SLA_CONFIG: Record<TicketPriority, { responseMinutes: number, resolveMinutes: number }> = {
    LOW: { responseMinutes: 24 * 60, resolveMinutes: 5 * 24 * 60 },
    MEDIUM: { responseMinutes: 8 * 60, resolveMinutes: 3 * 24 * 60 },
    HIGH: { responseMinutes: 2 * 60, resolveMinutes: 24 * 60 },
    URGENT: { responseMinutes: 30, resolveMinutes: 4 * 60 }
}

export function calculatesSLADates(priority: TicketPriority, createdAt?: Date) {
    const base = createdAt ? dayjs(createdAt) : dayjs();
    const config = SLA_CONFIG[priority];

    return {
        slaResponseDueAt: base.add(config.responseMinutes, 'minute').toDate(),
        slaResolveDueAt: base.add(config.resolveMinutes, 'minutes').toDate(),
    };
}

export function isSLABreached(dueAt: Date | null, now: Date = new Date()): boolean {
    if(!dueAt) return false;
    return dayjs(now).isAfter(dayjs(dueAt));
}

export function getSLAConfig(priority: TicketPriority) {
    return SLA_CONFIG[priority];
}