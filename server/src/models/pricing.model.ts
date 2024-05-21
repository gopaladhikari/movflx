import { Schema, model, InferSchemaType } from "mongoose";

const pricingSchema = new Schema(
	{
		pricing_plans: [
			{
				id: { type: Number, required: true },
				plan: {
					type: String,
					enum: ["basic", "standard", "premium"],
					required: true,
				},

				price: { type: Number, enum: [799, 999, 1299], required: true },

				videoQuality: {
					type: String,
					enum: ["Good", "Better", "Best"],
					required: true,
				},

				videoResolution: {
					type: String,
					enum: ["480p", "720p", "4k+HDR"],
					required: true,
				},
				screens: { type: Number, enum: [1, 2, 4], required: true },
			},
		],
		payment_options: [
			{
				id: { type: Number, required: true },
				name: {
					type: String,
					enum: ["Esewa", "Khalti", "Paypal"],
					required: true,
				},
				img: { type: String, required: true },
			},
		],
	},
	{
		timestamps: true,
	}
);

interface PricingDocument extends InferSchemaType<typeof pricingSchema> {}

export const Pricing = model<PricingDocument>("Pricing", pricingSchema);
