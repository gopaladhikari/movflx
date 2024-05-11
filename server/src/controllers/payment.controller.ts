import { env } from "../conf/env";
import { Pricing } from "../models/pricing.model";
import { ApiError } from "../utils/ApiError";
import { dbHandler } from "../utils/dbHandler";
import crypto from "crypto";

// For Esewa

function getEsewaHash(amount: string, transaction_uuid: string) {
	const data = `total_amount=${amount},transaction_uuid=${transaction_uuid},product_code=${env.esewaProductCode}`;

	const hash = crypto
		.createHmac("sha256", env.esewaSecretKey)
		.update(data)
		.digest("base64");

	return {
		signature: hash,
		signed_field_names: "total_amount,transaction_uuid,product_code",
	};
}

async function verifyEsewaPayment(encoded: string) {
	const decoded = atob(encoded);

	const decodedData = JSON.parse(decoded);
	console.log("decoded", decoded);
	console.log("decodedData", decodedData);

	const message = `transaction_code=${decodedData.transaction_code},status=${decodedData.status},total_amount=${decodedData.total_amount},transaction_uuid=${decodedData.transaction_uuid},product_code=${env.esewaProductCode},signed_field_names=${decodedData.signed_field_names}`;

	console.log("Test");
	const hash = crypto
		.createHmac("sha256", env.esewaSecretKey)
		.update(message)
		.digest("base64");

	console.log("verifyEsewaPayment hash", hash);

	try {
		const response = await fetch(
			env.esewaGatewayUrl.concat(
				`/api/epay/transaction/status/?product_code=${env.esewaProductCode}&total_amount=${decodedData.total_amount}&transaction_uuid=${decodedData.transaction_uuid}`
			),
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		const data = await response.json();

		console.log("verifyEsewaPayment data", data);

		if (
			data.status !== "COMPLETE" ||
			data.transaction_uuid !== decodedData.transaction_uuid ||
			Number(data.total_amount) !== Number(decodedData.total_amount)
		)
			return { message: "Invalid Info", decodedData };

		return data;
	} catch (error) {
		console.error(`VerifyEsewaPayment error ${error}`);
		return null;
	}
}

const esewaPayment = dbHandler(async (req, res) => {
	const { plan } = req.params;

	if (!plan)
		return res
			.status(400)
			.json(new ApiError(400, "All fields are required."));

	const pricing = await Pricing.find();
	const paymentOptions = pricing[0].pricing_plans;

	const option = paymentOptions.find((option) => option.plan === plan);

	if (!option)
		return res.status(400).json(new ApiError(400, "Invalid plan."));

	const { signature } = getEsewaHash(
		option.price.toString(),
		option.id.toString()
	);

	const response = await verifyEsewaPayment(signature);

	if (!response)
		return res.status(400).json(new ApiError(400, "Invalid signature."));

	res.status(200).json({
		message: "Payment options fetched successfully.",
		paymentOptions: option,
	});
});

export { esewaPayment };
