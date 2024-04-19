import { Schema, model, InferSchemaType } from "mongoose";

const commentSchema = new Schema(
	{
		commentetor_avatar: {
			type: String,
			required: true,
		},

		email: {
			type: String,
			required: true,
		},

		movie_id: {
			type: Schema.Types.ObjectId,
			ref: "Movie",
		},

		name: {
			type: String,
			required: true,
		},

		text: {
			type: String,
			required: true,
		},

		date: {
			type: Date,
			default: new Date(),
		},
	},
	{
		timestamps: true,
	}
);

type TComment = InferSchemaType<typeof commentSchema>;

export const Comment = model<TComment>("Comment", commentSchema);
