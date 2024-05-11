export default class AppError extends Error {
  status: string;
  isOperational: true;
  constructor(public message: string, public statusCode: number) {
    super(message);
    this.status = `${this.statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;
  }
}
