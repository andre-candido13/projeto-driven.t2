import { prisma } from '@/config';
import { PaymentData } from '@/protocols';



async function getPayments(ticketId: number) {

    return prisma.payment.findFirst({
        where: {ticketId}
    })

}

async function findPayment (ticketId: number) {

    return await prisma.payment.findFirst({
      where: { ticketId },
      include: { Ticket:
         { include:
          { Enrollment: true } 
        } 
      },
    });
  }

  async function postPayment (data: PaymentData) {
    return await prisma.payment.create({
      data: data
    });
  }

  const paymentRepository = {
    getPayments,
    findPayment,
    postPayment
  }

  export default paymentRepository