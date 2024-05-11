import { Router } from "express";
import {
	getPaymentOptions,
	getPricingPlans,
} from "../controllers/pricing.controller";

const pricingRouter = Router();

// public routes

pricingRouter.route("/get-payment-options").get(getPaymentOptions);
pricingRouter.route("/get-pricing-plans").get(getPricingPlans);

export { pricingRouter };
