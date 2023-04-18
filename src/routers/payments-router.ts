import { getPaymentsController, postPayments } from "@/controllers/payments-controller";
import { authenticateToken, validateBody } from "@/middlewares";
import { Router } from "express";


const paymentsRouter = Router();



paymentsRouter
.all('/*', authenticateToken)
.get('/', getPaymentsController)
.post('/process', postPayments)


export { paymentsRouter }