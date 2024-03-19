export class ApiError extends Error {
  statusCode: number;
  error: string;
  sucess: boolean;

  constructor(statusCode: number, message: string, error: string) {
    super(message);
    this.statusCode = statusCode;
    this.error = error;
    this.sucess = false;
  }
}
