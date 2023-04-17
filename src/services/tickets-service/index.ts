import { notFoundError } from "@/errors"
import { TicketParams } from "@/protocols"
import enrollmentRepository from "@/repositories/enrollment-repository"
import { ticketTypeRepository } from "@/repositories/tickets-repository"


async function getTicketType () {

    const tickets = await ticketTypeRepository.getTicketType()
    return tickets

}
async function getTicketByEnrollment (userId: number) {
    const getTicketByEnrollment = await enrollmentRepository.findWithAddressByUserId(userId)
    if (!getTicketByEnrollment) {
        throw notFoundError();
    }

    const ticket = await ticketTypeRepository.getTicketByEnrollment(getTicketByEnrollment.id)
    if (!ticket) {
        throw notFoundError();
    }
    return ticket;
}

async function postTicket (params: TicketParams) {
const postTicket = await enrollmentRepository.findWithAddressByUserId(params.userId)
if (!postTicket) {
    throw notFoundError();
}

const {ticketTypeId, status} = params

const postNewTicket = await ticketTypeRepository.postTicket(ticketTypeId, postTicket.id, status);

  return postNewTicket;

}



export const ticketTypeService = {
    getTicketType,
    getTicketByEnrollment, 
    postTicket
    
}

