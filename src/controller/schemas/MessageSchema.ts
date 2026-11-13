import z from "zod";
import { ROLE } from "../../model/User.js";

export const getTicketmessageSchema = z.object({
    ticketId: z.string().min(2, "O id da passado deve ser passado"),
})

export const getUserMessageSchema = z.object({
    userId:  z.string().min(2, "O id do usupario deve passado deve ser passado"),
})

export const getRoleMessageSchema = z.object({
    userRole:  z.enum(ROLE),
})