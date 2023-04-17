import { AuthenticatedRequest } from "@/middlewares";
import ticketTypeService from "@/services/tickets-service";
import { Response } from "express"
import httpStatus from "http-status";



export async function getTicketTypeInController (req: AuthenticatedRequest, res: Response) {
    try {

        const ticketsType = await ticketTypeService.getTicketTypes()
        return res.status(httpStatus.OK).send(ticketsType);
    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
    }
}

export async function postTicket (req: AuthenticatedRequest, res: Response) {
    const { ticketTypeId } = req.body
    const userId = req.userId

    try{
        const postTickets = await ticketTypeService.postTicket({
            userId,
            ticketTypeId,
            status: 'RESERVED',
        })
        return res.status(httpStatus.CREATED).send(postTickets);

    } catch (error) {
        if (error.name === 'NotFoundError') {
          return res.sendStatus(httpStatus.NOT_FOUND);
        }
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
      }
    }

export async function getTicketByEnrollment (req: AuthenticatedRequest, res: Response) {
    const userId = req.userId
    try{

        const ticketByEnrollment = await ticketTypeService.getTicketByEnrollment(userId)
        return res.status(httpStatus.OK).send(ticketByEnrollment)

    } catch (error) {
        if (error.name === 'NotFoundError') {
        return res.sendStatus(httpStatus.NOT_FOUND)
    }
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
}
}

