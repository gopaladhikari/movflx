import { Router } from "express";
import {
	getPaymentOptions,
	getPricingPlans,
	getPurchasedInfo,
} from "../controllers/pricing.controller";
import passport from "passport";

const pricingRouter = Router();

// public routes

pricingRouter.route("/get-payment-options").get(getPaymentOptions);
pricingRouter.route("/get-pricing-plans").get(getPricingPlans);

// private routes
pricingRouter
	.route("/get-purchased-info")
	.get(passport.authenticate("jwt", { session: false }), getPurchasedInfo);

export { pricingRouter };
