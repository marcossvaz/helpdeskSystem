export const AGENTSTATUSROLE = [
    "AVAILABLE",
    "BUSY",
    "OFFLINE"
] as const

export type AgentStatus = (typeof AGENTSTATUSROLE[number]);

// ----------------------------------
export const ROLE  = [
    "AGENT",
    "TEAM_LEAD",
    "ADMIN",
    "CUSTOMER"
] as const

export type Role = (typeof ROLE[number])
// -----------------------------------
export interface User {
    name: string;
    email: string;
    password: string;
    role: Role
}