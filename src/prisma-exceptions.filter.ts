import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

type ExceptionRequestError = { code: string; message: string };
type ExceptionData = { statusCode: number; message: string };

@Catch((Prisma as any).PrismaClientKnownRequestError)
export class PrismaExceptionsFilter extends BaseExceptionFilter {
  catch(exception: ExceptionRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();

    const exceptions: Record<string, ExceptionData> = {
      P2000: { statusCode: HttpStatus.BAD_REQUEST, message: 'Bad Request' },
      P2002: { statusCode: HttpStatus.CONFLICT, message: 'Resource already exists' },
      P2025: { statusCode: HttpStatus.NOT_FOUND, message: exception.message },
    };

    const data = exceptions[exception.code];
    if (!data) return super.catch(exception, host);

    res.status(data.statusCode).json(data);
  }
}
