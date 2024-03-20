export class ApiError extends Error {
  statusCode: number;
  sucess: boolean;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.sucess = false;
  }
}
