import { Router } from "express";
import { esewaPayment } from "../controllers/payment.controller";

const paymentRouter = Router();

paymentRouter.route("/esewa/:plan").post(esewaPayment);

export { paymentRouter };
