export const ROLE  = [
    "AGENT",
    "TEAM_LEAD",
    "ADMIN",
    "CUSTOMER"
] as const

type Role = (typeof ROLE[number])

export interface User {
    name: string;
    email: string;
    password: string;
    role: Role
}