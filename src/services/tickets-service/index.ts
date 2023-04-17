import { notFoundError } from "@/errors"
import enrollmentRepository from "@/repositories/enrollment-repository"
import { ticketTypeRepository } from "@/repositories/tickets-repository"
import { TicketStatus } from "@prisma/client"


export type TicketParams = {
    userId: number;
    ticketTypeId: number;
    status: TicketStatus;
  };


async function getTicketTypes () {

    const tickets = await ticketTypeRepository.getTicketType()
    return tickets
}

async function getTicketByEnrollment (userId: number) {
    const getTicketByEnrollments = await enrollmentRepository.findWithAddressByUserId(userId)
    if (!getTicketByEnrollments) {
        throw notFoundError();
    }

    const ticket = await ticketTypeRepository.getTicketByEnrollment(getTicketByEnrollments.id)
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

const ticketTypeService = {
    getTicketTypes,
    getTicketByEnrollment, 
    postTicket
    
}

export default ticketTypeService;

