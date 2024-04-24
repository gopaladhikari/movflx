import { Schema, model, InferSchemaType, Document } from "mongoose";

const awardSchema = new Schema({
	win: {
		type: Number,
		required: true,
	},

	nominations: {
		type: Number,
		required: true,
	},

	text: {
		type: String,
		required: true,
	},
});

const imdbSchema = new Schema({
	rating: {
		type: Number,
		required: true,
	},

	votes: {
		type: Number,
		required: true,
	},

	id: {
		type: Number,
		required: true,
	},
});

const tomatoesSchema = new Schema({
	viewer: {
		type: {
			rating: {
				type: Number,
				required: true,
			},
			numReviews: {
				type: Number,
				required: true,
			},
		},
		required: true,
	},

	lastUpdated: {
		type: Date,
		required: true,
	},
});

const movieSchema = new Schema(
	{
		plot: {
			type: String,
			required: true,
		},

		genres: {
			type: [String],
			required: true,
		},

		runtime: {
			type: Number,
			required: true,
		},

		cast: {
			type: [String],
			required: true,
		},

		num_mflix_comments: {
			type: Number,
			required: true,
		},

		poster: {
			type: String,
			required: true,
		},

		title: {
			type: String,
			required: true,
			index: true,
		},

		fullplot: {
			type: String,
			required: true,
		},

		languages: {
			type: [String],
			required: true,
		},

		released: {
			type: Date,
			required: true,
		},

		directors: {
			type: [String],
			required: true,
		},

		writer: {
			type: [String],
			required: true,
		},

		award: {
			type: awardSchema,
			required: true,
		},

		lastupdated: {
			type: Date,
			required: true,
		},

		year: {
			type: Number,
			required: true,
		},

		imdb: {
			type: imdbSchema,
			required: true,
		},

		countries: {
			type: [String],
			required: true,
		},

		type: {
			type: String,
			required: true,
		},

		tomatoes: {
			type: tomatoesSchema,
			required: true,
		},
	},
	{ timestamps: true }
);

interface IMovie extends InferSchemaType<typeof movieSchema>, Document {}

export const Movie = model<IMovie>("Movie", movieSchema);
