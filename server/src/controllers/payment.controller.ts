import { env } from "../conf/env";
import { Pricing } from "../models/pricing.model";
import { Purchase } from "../models/purchase.model";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { dbHandler } from "../utils/dbHandler";
import crypto from "crypto";

// For Esewa

function getEsewaHash(amount: number, transaction_uuid: string) {
	const data = `total_amount=${amount},transaction_uuid=${transaction_uuid},product_code=${env.esewaProductCode}`;

	const hash = crypto
		.createHmac("sha256", env.esewaSecretKey)
		.update(data)
		.digest("base64");

	return hash;
}

const createEsewaPayment = dbHandler(async (req, res) => {
	const { plan } = req.params;
	const { email } = req.body;

	if (!plan || !email)
		return res
			.status(400)
			.json(new ApiError(400, "All fields are required."));

	const pricing = await Pricing.find();
	const paymentOptions = pricing[0].pricing_plans;

	const option = paymentOptions.find((option) => option.plan === plan);

	if (!option)
		return res.status(400).json(new ApiError(400, "Invalid plan."));

	const uuid = crypto.randomUUID().toString();

	const signature = getEsewaHash(option.price, uuid);

	const formData = {
		amount: option.price,
		failure_url: env.bakendUri.concat("/api/v1/payment/esewa/failure"),
		product_delivery_charge: "0",
		product_service_charge: "0",
		product_code: env.esewaProductCode,
		signature,
		signed_field_names: "total_amount,transaction_uuid,product_code",
		success_url: env.bakendUri.concat("/api/v1/payment/esewa/success"),
		tax_amount: 0,
		total_amount: option.price,
		transaction_uuid: uuid,
	};

	const purchase = await Purchase.create({
		user_email: email,
		transactionId: uuid,
		purchasePlan: plan,
		amount: option.price,
		paymentMethod: "Esewa",
		status: "pending",
		paymentDate: new Date(),
	});

	if (!purchase)
		return res
			.status(500)
			.json(new ApiError(500, "Failed to create purchase."));

	res
		.status(200)
		.json(new ApiResponse(200, formData, "Esewa payment data"));
});

const esewaSuccess = dbHandler(async (req, res) => {
	const { data } = req.query;

	const decodedData = JSON.parse(
		Buffer.from(data as string, "base64").toString()
	);
	console.log(decodedData);

	if (decodedData.status !== "COMPLETE")
		return res.redirect(env.domain.concat("/pricing/failure"));

	const purchase = await Purchase.findOneAndUpdate(
		{ transactionId: decodedData.transaction_uuid },
		{ status: "success" },
		{ new: true }
	);

	if (!purchase)
		return res.redirect(env.domain.concat("/pricing/failure"));

	res.redirect(env.domain.concat("/pricing/success"));
});

export { createEsewaPayment, esewaSuccess };
