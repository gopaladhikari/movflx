import { Pricing } from "../models/pricing.model";
import { Purchase } from "../models/purchase.model";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { dbHandler } from "../utils/dbHandler";

const getPaymentOptions = dbHandler(async (req, res) => {
	const pricing = await Pricing.find();

	if (!pricing)
		return res
			.status(404)
			.json(new ApiError(404, "Payment options not found"));

	const options = pricing[0].payment_options;

	res
		.status(200)
		.json(
			new ApiResponse(
				200,
				options,
				"Payment options fetched successfully."
			)
		);
});

const getPricingPlans = dbHandler(async (req, res) => {
	const pricing = await Pricing.find();

	if (!pricing)
		return res
			.status(404)
			.json(new ApiError(404, "Pricing plans not found"));

	const plans = pricing[0].pricing_plans;

	res
		.status(200)
		.json(
			new ApiResponse(200, plans, "Payment options fetched successfully.")
		);
});

const getPurchasedInfo = dbHandler(async (req, res) => {
	const { id } = req.query;

	if (!id) return res.status(400).json(new ApiError(400, "Invalid id"));

	const purchase = await Purchase.findById(id);

	if (!purchase)
		return res.status(404).json(new ApiError(404, "Purchase not found"));

	res
		.status(200)
		.json(
			new ApiResponse(200, purchase, "Purchase info fetched successfully.")
		);
});

export { getPricingPlans, getPaymentOptions, getPurchasedInfo };
