import { Schema, model, InferSchemaType, Document } from "mongoose";

const theaterSchema = new Schema({
	theaterId: {
		type: Number,
		required: true,
	},
	location: {
		address: {
			street1: {
				type: String,
				required: true,
			},
			city: {
				type: String,
				required: true,
			},
			state: {
				type: String,
				required: true,
			},
			zipcode: {
				type: String,
				required: true,
			},
		},

		geo: {
			type: {
				type: String,
				enum: ["Point"],
				required: true,
			},
			coordinates: {
				type: [Number],
				required: true,
			},
		},
	},
});

type Theater = InferSchemaType<typeof theaterSchema> & Document;

export const Theater = model<Theater>("Theater", theaterSchema);
