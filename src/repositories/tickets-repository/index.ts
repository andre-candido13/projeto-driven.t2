import { TicketStatus } from '@prisma/client';
import { prisma } from '@/config';


async function getTicketType() {
return await prisma.ticketType.findMany();
}

async function getTicketByEnrollment(enrollmentId: number) {
    return await prisma.ticket.findFirst({
        where: {
            enrollmentId:enrollmentId, 
        }, include: {
            TicketType: true
        }
    })
}

async function getTicketByTicket(ticketId: number) {
    return prisma.ticket.findFirst({
        where: {
          id: ticketId,
        },
        include: {
          Enrollment: true,
        },
      });
    }
    
async function getTicketByStatus (id: number) {
    return prisma.ticket.update({
        where: {id},
        data: {
            status: 'PAID',
        }
    })
}

async function postTicket (ticketTypeId: number, enrollmentId: number, status: TicketStatus) {
    return await prisma.ticket.create({
        data: { ticketTypeId,
        enrollmentId,
        status
        }, include: {
            TicketType: true
        }

    })
    
}



export const ticketTypeRepository = {
    getTicketType,
    getTicketByEnrollment,
    getTicketByTicket,
    getTicketByStatus,
    postTicket
}