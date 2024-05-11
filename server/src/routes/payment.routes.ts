import { Router } from "express";
import {
	createEsewaPayment,
	esewaSuccess,
} from "../controllers/payment.controller";

const paymentRouter = Router();

paymentRouter
	.route("/create-esewa-payment/:plan")
	.post(createEsewaPayment);

paymentRouter.route("/esewa/success").get(esewaSuccess);

paymentRouter.route("/esewa/failure").get((req, res) => {
	res.send("failure");
});

export { paymentRouter };
