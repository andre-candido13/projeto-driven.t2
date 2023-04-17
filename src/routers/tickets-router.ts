import { getTicketByEnrollment, getTicketTypeInController, postTicket } from "@/controllers";
import { authenticateToken, validateBody } from "@/middlewares";
import { ticketSchema } from "@/schemas";
import { Router } from "express";



const ticketsRouter = Router();


ticketsRouter
.all('/', authenticateToken)
.get('/types',  getTicketTypeInController  )
.post('/', validateBody (ticketSchema), postTicket)
.get('/', getTicketByEnrollment)


    export {ticketsRouter}