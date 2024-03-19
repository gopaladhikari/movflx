export class ApiResponse {
  statusCode: number;
  data: unknown;
  message: string;
  sucess: boolean;

  constructor(statusCode: number, data: unknown, message: string) {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.sucess = true;
  }
}
