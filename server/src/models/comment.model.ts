import { Schema, model, InferSchemaType } from "mongoose";

const commentSchema = new Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    index: true,
  },

  movie_id: {
    type: Schema.Types.ObjectId,
    ref: "Movie",
    required: true,
  },

  text: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    default: Date.now(),
  },
});

type TComment = InferSchemaType<typeof commentSchema>;

export const Comment = model<TComment>("Comment", commentSchema);
