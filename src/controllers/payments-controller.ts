import { Response } from "express";
import { AuthenticatedRequest } from "@/middlewares";
import httpStatus from "http-status";
import paymentService from "@/services/payments-service";



export async function getPaymentsController (req: AuthenticatedRequest, res: Response) {

    const ticketId  = req.query.ticketId as string

    try {

        const getPayments = await paymentService.getPayments({ticketId: Number(ticketId), userId: req.userId})
        return res.status(httpStatus.OK).send(getPayments);
    } catch (error) {
        if (error.name === 'UnauthorizedError') 
        return res.sendStatus(httpStatus.UNAUTHORIZED);
        if (error.name === 'NotFoundError') 
        return res.sendStatus(httpStatus.NOT_FOUND);
        if (error.name === 'InvalidDataError') 
        return res.sendStatus(httpStatus.BAD_REQUEST);

        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
}
}
   