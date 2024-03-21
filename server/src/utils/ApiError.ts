export class ApiError extends Error {
  statusCode: number;
  sucess: boolean;
  message: string;
  data: unknown;
  stack?: string | undefined;

  constructor(statusCode: number, message: string, stack = "") {
    super(message);
    this.statusCode = statusCode;
    this.sucess = false;
    this.data = null;
    this.message = message;
    if (stack) this.stack = stack;
    else Error.captureStackTrace(this, this.constructor);
  }
}
