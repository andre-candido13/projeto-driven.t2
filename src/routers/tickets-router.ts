import { getTicketType, postTicket } from "@/controllers";
import { authenticateToken, validateBody } from "@/middlewares";
import { ticketSchema } from "@/schemas";
import { Router } from "express";



const ticketsRouter = Router();


ticketsRouter
    .get('/', getTicketType)
    .get('/types', getTicketType)
    .post('/', validateBody (ticketSchema), postTicket)
    .all('/', authenticateToken)


    export {ticketsRouter}