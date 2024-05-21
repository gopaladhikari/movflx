import passport from "passport";
import { Router } from "express";
import {
	createEsewaPayment,
	createKhaltiPayment,
	createPaypalPayment,
	esewaFailure,
	esewaSuccess,
	khaltiSuccess,
	paypalSuccess,
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

paymentRouter
	.route("/create-paypal-payment/:plan")
	.post(
		passport.authenticate("jwt", { session: false }),
		createPaypalPayment
	);

paymentRouter.route("/paypal/callback").get(paypalSuccess);

export { paymentRouter };
