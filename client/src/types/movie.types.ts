interface IMovie {
  _id: string;
  runtime: number;
  title: string;
  year: number;
  num_mflix_comments: number;
  poster: string;
}

export interface IMovieResponse {
  statusCode: number;
  data: IMovie[];
  message: string;
  sucess: boolean;
}
