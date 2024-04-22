import { Schema, model, InferSchemaType } from "mongoose";

const contactSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	subject: {
		type: String,
		required: true,
	},
	message: {
		type: String,
		required: true,
	},
});

type TContactSchema = InferSchemaType<typeof contactSchema>;

export const Contact = model<TContactSchema>("Contact", contactSchema);
