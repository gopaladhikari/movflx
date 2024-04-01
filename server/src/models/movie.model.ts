import { Schema, model, InferSchemaType } from "mongoose";

const movieSchema = new Schema({}, { timestamps: true });

interface IMovie extends InferSchemaType<typeof movieSchema> {}

export const Movie = model<IMovie>("Movie", movieSchema);
