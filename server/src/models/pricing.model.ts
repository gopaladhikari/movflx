import { Schema, model, InferSchemaType } from "mongoose";

const pricingSchema = new Schema({
	pricing_plans: [
		{
			id: { type: Number, required: true },
			plan: { type: String, required: true },
			price: { type: Number, required: true },
			videoQuality: { type: String, required: true },
			videoResolution: { type: String, required: true },
			screens: { type: Number, required: true },
		},
	],
	payment_options: [
		{
			id: { type: Number, required: true },
			name: { type: String, required: true },
			img: { type: String, required: true },
		},
	],
});

interface PricingDocument extends InferSchemaType<typeof pricingSchema> {}

export const Pricing = model<PricingDocument>("Pricing", pricingSchema);
