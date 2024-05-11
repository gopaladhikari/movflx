import { Schema, model, InferSchemaType } from "mongoose";

const purchaseSchema = new Schema(
	{
		user_id: { type: Schema.Types.ObjectId, ref: "User" },
		transactionId: { type: String, required: true, unique: true },
		purchasePlan: {
			type: String,
			enum: ["basic", "standard", "premium"],
			required: true,
		},

		amount: {
			type: Number,
			enum: [799, 999, 1299],
			required: true,
		},

		paymentMethod: {
			type: String,
			enum: ["Esewa", "Khalti"],
			required: true,
		},

		status: {
			type: String,
			enum: ["pending", "success", "failed"],
			default: "pending",
			required: true,
		},

		paymentDate: {
			type: Date,
			default: Date.now(),
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

interface PurchaseDocument
	extends InferSchemaType<typeof purchaseSchema> {}

export const Purchase = model<PurchaseDocument>(
	"Purchase",
	purchaseSchema
);
