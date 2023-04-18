import { getPaymentsController } from "@/controllers/payments-controller";
import { authenticateToken } from "@/middlewares";
import { Router } from "express";







const paymentsRouter = Router();



paymentsRouter
.get('/', authenticateToken, getPaymentsController)


export { paymentsRouter }