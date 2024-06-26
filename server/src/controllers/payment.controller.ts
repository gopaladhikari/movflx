import { env } from "../conf/env";
import { Pricing } from "../models/pricing.model";
import { Purchase } from "../models/purchase.model";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { dbHandler } from "../utils/dbHandler";
import crypto from "crypto";
import axios from "axios";
import paypal, { Payment } from "paypal-rest-sdk";

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

	if (decodedData.status !== "COMPLETE")
		return res.redirect(env.domain.concat("/pricing/failure"));

	const purchase = await Purchase.findOneAndUpdate(
		{ transactionId: decodedData.transaction_uuid },
		{ status: "success" },
		{ new: true }
	);

	if (!purchase)
		return res.redirect(env.domain.concat("/pricing/failure"));

	res.redirect(env.domain.concat(`/pricing/success?id=${purchase._id}`));
});

const esewaFailure = dbHandler(async (req, res) => {
	res.redirect(env.domain.concat("/pricing/failure"));
});

// For Khalti

type KhaltiData = {
	pidx: string;
	payment_url: string;
	expires_at: Date;
	expires_in: number;
};

type KhaltiError = {
	customer_info: { [key: string]: string[] };
	error_key: string;
};

type KhaltiResponse = KhaltiError | KhaltiData;

const createKhaltiPayment = dbHandler(async (req, res) => {
	const { plan } = req.params;
	const { email, name } = req.body;

	if (!plan || !email || !name)
		return res
			.status(400)
			.json(new ApiError(400, "All fields are required."));

	const pricing = await Pricing.find();
	const paymentOptions = pricing[0].pricing_plans;

	const option = paymentOptions.find((option) => option.plan === plan);

	if (!option)
		return res.status(400).json(new ApiError(400, "Invalid plan."));

	const uuid = crypto.randomUUID().toString();

	const formData = {
		return_url: env.bakendUri.concat("/api/v1/payment/khalti/callback"),
		website_url: env.domain,
		amount: option.price * 100,
		purchase_order_id: uuid,
		purchase_order_name: option.plan,
		customer_info: { email, name },
	};

	const url = env.khaltiApi.concat("/epayment/initiate/");

	try {
		const { data } = await axios.post<KhaltiResponse>(url, formData, {
			headers: {
				Authorization: `key ${env.khaltiKey}`,
				"Content-Type": "application/json",
			},
		});

		if ("error_key" in data) {
			const message = Object.entries(data.customer_info).map(
				([key, value]) => `${key}: ${value[0]}`
			);

			return res
				.status(500)
				.json(new ApiError(500, message[0], data.error_key));
		}

		const purchase = await Purchase.findOne({
			user_email: email,
			status: "pending",
			purchasePlan: plan,
		});

		if (purchase) {
			purchase.pidx = data.pidx;
			await purchase.save();
			return res
				.status(200)
				.json(
					new ApiResponse(200, data, "Khalti intitialzed successfully.")
				);
		}

		const newPurchase = await Purchase.create({
			user_email: email,
			purchasePlan: plan,
			amount: option.price,
			paymentMethod: "Khalti",
			pidx: data.pidx,
		});

		if (!newPurchase)
			return res
				.status(500)
				.json(new ApiError(500, "Failed to create purchase."));

		res
			.status(200)
			.json(
				new ApiResponse(200, data, "Khalti intitialzed successfully.")
			);
	} catch (error) {
		console.error("error khalti payment:", error);
		res
			.status(500)
			.json(
				new ApiError(
					500,
					(error as Error).message || "Something went wrong"
				)
			);
	}
});

const khaltiSuccess = dbHandler(async (req, res) => {
	const { pidx, status, transaction_id } = req.query;

	if (status !== "Completed")
		return res.redirect(env.domain.concat("/pricing/failure"));

	const url = env.khaltiApi.concat("/epayment/lookup/");

	try {
		const { data } = await axios.post(
			url,
			{ pidx },
			{
				headers: {
					Authorization: `key ${env.khaltiKey}`,
					"Content-Type": "application/json",
				},
			}
		);

		if (data.status !== "Completed")
			return res.redirect(env.domain.concat("/pricing/failure"));

		const purchase = await Purchase.findOneAndUpdate(
			{
				pidx,
			},
			{
				status: "success",
				transactionId: transaction_id,
			},
			{
				new: true,
			}
		);

		if (!purchase)
			return res.redirect(env.domain.concat("/pricing/failure"));

		res.redirect(env.domain.concat(`/pricing/success?id=${purchase._id}`));
	} catch (error) {
		console.error("error khalti success:", error);
		res.redirect(env.domain.concat("/pricing/failure"));
	}
});

// For Paypal

paypal.configure({
	mode: "sandbox", // live
	client_id: env.paypalClientId,
	client_secret: env.paypalClientSecret,
});

const createPaypalPayment = dbHandler(async (req, res) => {
	console.log("paypal create payment");
	const { plan } = req.params;
	const { email } = req.body;
	if (!plan || !email)
		return res
			.status(400)
			.json(new ApiError(400, "All fields are required."));

	try {
		const pricing = await Pricing.find();
		const paymentOptions = pricing[0].pricing_plans;

		const option = paymentOptions.find((option) => option.plan === plan);

		if (!option)
			return res.status(400).json(new ApiError(400, "Invalid plan."));

		const create_payment_json: Payment = {
			intent: "sale",
			payer: {
				payment_method: "paypal",
			},
			redirect_urls: {
				return_url: env.bakendUri.concat(
					"/api/v1/payment/paypal/callback"
				),
				cancel_url: env.bakendUri.concat("/api/v1/payment/paypal/cancel"),
			},
			transactions: [
				{
					item_list: {
						items: [
							{
								name: `${option.plan} plan`,
								sku: "Subscription",
								price: "1.00",
								currency: "USD",
								quantity: 1,
							},
						],
					},
					amount: {
						currency: "USD",
						total: "1.00",
					},
					description: "This is the payment description.",
				},
			],
		};

		paypal.payment.create(
			create_payment_json,
			async function (error, payment) {
				if (error) {
					return res.status(500).json(new ApiError(500, error.message));
				} else {
					if (payment.links) {
						for (const link of payment.links) {
							if (link.rel === "approval_url") {
								const purchase = await Purchase.findOne({
									email: email,
									status: "pending",
									purchasePlan: plan,
								});

								if (purchase) {
									purchase.transactionId = payment.id;
									await purchase.save();
								}

								const newPurchase = await Purchase.create({
									user_email: email,
									purchasePlan: plan,
									amount: option.price,
									paymentMethod: "Paypal",
									status: "pending",
									paymentDate: new Date(),
									transactionId: payment.id,
								});

								if (!newPurchase) {
									res
										.status(500)
										.json(new ApiError(500, "Failed to create purchase."));
									break;
								}

								res
									.status(200)
									.json(new ApiResponse(200, link, "Paypal payment data"));
								break;
							}
						}
					} else {
						return res
							.status(500)
							.json(new ApiError(500, "Payment failed."));
					}
				}
			}
		);
	} catch (error) {
		console.log("error paypal payment:", error);
		res.status(500).json(new ApiError(500, "Payment failed."));
	}
});

const paypalSuccess = dbHandler(async (req, res) => {
	const { paymentId } = req.query;

	try {
		const purchase = await Purchase.findOne({
			transactionId: paymentId,
			status: "pending",
		});

		if (!purchase)
			return res.redirect(env.domain.concat("/pricing/failure"));

		purchase.status = "success";
		await purchase.save();

		return res.redirect(
			env.domain.concat(`/pricing/success?id=${purchase._id}`)
		);
	} catch (error) {
		console.log("error paypal payment:", error);

		return res.redirect(env.domain.concat("/pricing/failure"));
	}
});

export {
	createEsewaPayment,
	esewaSuccess,
	createKhaltiPayment,
	khaltiSuccess,
	esewaFailure,
	createPaypalPayment,
	paypalSuccess,
};
