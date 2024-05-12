import passport from "passport";
import { Router } from "express";
import {
	createEsewaPayment,
	createKhaltiPayment,
	esewaFailure,
	esewaSuccess,
	khaltiSuccess,
} from "../controllers/payment.controller";

const paymentRouter = Router();

// Esewa

paymentRouter
	.route("/create-esewa-payment/:plan")
	.post(
		passport.authenticate("jwt", { session: false }),
		createEsewaPayment
	);

paymentRouter.route("/esewa/success").get(esewaSuccess);

paymentRouter.route("/esewa/failure").get(esewaFailure);

// Khalti

paymentRouter
	.route("/create-khalti-payment/:plan")
	.post(
		passport.authenticate("jwt", { session: false }),
		createKhaltiPayment
	);

paymentRouter.route("/khalti/callback").get(khaltiSuccess);

export { paymentRouter };
