export interface IMovie {
  _id: string;
  runtime: number;
  title: string;
  year: number;
  num_mflix_comments: number;
  poster: string;
}

export interface IMoviesResponse {
  statusCode: number;
  data: {
    movies: IMovie[];
    totalMovies: number;
  };
  message: string;
  sucess: boolean;
}

export interface IMovieResponse {
  statusCode: number;
  data: {
    _id: string;
    plot: string;
    genres: string[];
    runtime: number;
    cast: string[];
    poster: string;
    title: string;
    fullplot: string;
    languages: string[];
    released: string; // Assuming released is a string
    directors: string[];
    rated: string;
    writers: string[];
    awards: {
      wins: number;
      nominations: number;
      text: string;
    };
    lastupdated: string;
    year: number;
    imdb: {
      rating: number;
      votes: number;
      id: number;
    };
    countries: string[];
    type: string;
    tomatoes: {
      viewer: {
        rating: number;
        numReviews: number;
        meter: number;
      };
      fresh: number;
      critic: {
        rating: number;
        numReviews: number;
        meter: number;
      };
      rotten: number;
      lastUpdated: string;
    };
    num_mflix_comments: number;
  };

  message: string;
  sucess: boolean;
}
