export interface IMovie {
  _id: string;
  runtime: number;
  title: string;
  year: number;
  num_mflix_comments: number;
  poster: string;
}

export interface IMovieResponse {
  statusCode: number;
  data: {
    movies: IMovie[];
    totalMovies: number;
  };
  message: string;
  sucess: boolean;
}
