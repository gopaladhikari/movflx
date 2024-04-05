import { IComment } from "./comments.type";

interface IMovie {
  _id: string;
  runtime: number;
  title: string;
  year: number;
  movie_comments: IComment[];
  poster: string;
}

export interface IMovieResponse {
  statusCode: number;
  data: IMovie[];
  message: string;
  sucess: boolean;
}
