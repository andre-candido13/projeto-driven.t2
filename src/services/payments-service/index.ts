import { invalidDataError, notFoundError, unauthorizedError } from "@/errors";
import { PaymentBody, PaymentsParams } from "@/protocols";
import { ticketTypeRepository } from "@/repositories/tickets-repository";
import { PaymentData } from "@/protocols";
import paymentRepository from "@/repositories/payment-respository";


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

async function postPayment (params: PaymentBody) {

    const ticket = await ticketTypeRepository.getTicketByTicket(params.ticketId);
  if (!ticket) throw notFoundError();

  if (ticket.Enrollment.userId !== params.userId) throw unauthorizedError();

  const price = await ticketTypeRepository.getTicketByEnrollment(ticket.enrollmentId);

  const paymentData: PaymentData = {
    ticketId: params.ticketId,
    value: price.TicketType.price,
    cardIssuer: params.cardData.issuer,
    cardLastDigits: params.cardData.number.toString().slice(-4),
  };

  const createdPayment = await paymentRepository.postPayment(paymentData);

  await ticketTypeRepository.getTicketByStatus(ticket.id)

  return createdPayment;
}


const paymentService = {
    getPayments,
    postPayment
}



export default paymentService