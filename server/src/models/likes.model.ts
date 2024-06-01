import { Schema, model, InferSchemaType } from "mongoose";

const likesSchema = new Schema(
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

type TLikesSchema = InferSchemaType<typeof likesSchema>;

export const Like = model<TLikesSchema>("Like", likesSchema);
