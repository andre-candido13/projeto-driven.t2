import { invalidDataError, notFoundError, unauthorizedError } from "@/errors";
import { PaymentsParams } from "@/protocols";
import { ticketTypeRepository } from "@/repositories/tickets-repository";

async function getPayments ({userId, ticketId} : PaymentsParams) {

    
    if (!ticketId) {
        throw invalidDataError(['invalid ticket'])
    }
    
    const ticket = await ticketTypeRepository.getTicketByTicket(ticketId)
    if (!ticket) {
        throw notFoundError();
    }

    if (ticket.Enrollment.userId !== userId) {
        throw unauthorizedError();
    }
    
    
    const payments = ticketTypeRepository.getTicketByEnrollment(ticketId)
    if (!payments) {
        throw notFoundError();
    }
    return payments;

}

async function postPayment () {

}


const paymentService = {
    getPayments,
    postPayment
}



export default paymentService