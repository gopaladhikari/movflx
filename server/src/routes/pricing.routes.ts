import { Router } from "express";
import {
	esewaPayment,
	getPaymentOptions,
	getPricingPlans,
} from "../controllers/pricing.controller";

const paymentRouter = Router();

// public routes

paymentRouter.route("/get-payment-options").get(getPaymentOptions);
paymentRouter.route("/get-pricing-plans").get(getPricingPlans);

paymentRouter.post("/esewa", esewaPayment);

export { paymentRouter };
