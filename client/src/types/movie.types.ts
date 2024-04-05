import { AxiosResponse } from "axios";

interface IMovie {
  _id: string;
  runtime: number;
  title: string;
  year: number;
  poster: string;
}

export interface IMovieResponse extends AxiosResponse {
  statusCode: number;
  data: IMovie[];
  message: string;
  sucess: boolean;
}
