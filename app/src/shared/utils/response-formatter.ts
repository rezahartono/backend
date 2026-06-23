import { Request, Response } from 'express';
import { CustomResponseDTO } from '../application/dto/custom-response.dto';

export class ResponseFormatter<T> {
  constructor(
    private request: Request,
    private response: Response,
  ) {}

  format(
    data: T | T[],
    message: string,
    success: boolean = true,
    statusCode: number = 200,
  ) {
    const res = new CustomResponseDTO<T>();

    res.success = success;
    res.path = this.request.url;
    res.message = message;
    res.data = data;

    return this.response.status(statusCode).json(res);
  }
}
