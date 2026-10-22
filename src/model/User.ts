enum Role {
    AGENT = "AGENT",
    TEAM_LEAD = "TEAM_LEAD",
    ADMIN = "ADMIN"
}

export interface User {
    name: string;
    email: string;
    password: string;
    role: Role
}