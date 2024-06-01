import { Schema, model, InferSchemaType } from "mongoose";

const watchlistSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      index: true,
    },

    movie_id: [
      {
        type: Schema.Types.ObjectId,
        ref: "Movie",
        index: true,
      },
    ],
  },
  { timestamps: true }
);

type TWatchlistSchema = InferSchemaType<typeof watchlistSchema>;

export const Watchlist = model<TWatchlistSchema>(
  "Watchlist",
  watchlistSchema
);
