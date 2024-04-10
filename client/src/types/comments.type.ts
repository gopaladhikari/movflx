export interface IComment {
  _id: string;
  name: string;
  email: string;
  movie_id: string;
  text: string;
  date: string;
}

export interface IResponseComments {
  data: IComment[];
  sucess: boolean;
  statusCode: number;
  message: string;
}

export interface AddCommentResponse {
  statusCode: number;
  data: {
    email: string;
    movie_id: string;
    name: string;
    text: string;
    date: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  message: string;
  success: boolean;
}
