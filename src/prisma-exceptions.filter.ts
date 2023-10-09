// @ts-nocheck
import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionsFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();

    const exceptions: Record<string, { statusCode: number; message: string }> = {
      P2000: { statusCode: HttpStatus.BAD_REQUEST, message: 'Bad Request' },
      P2002: { statusCode: HttpStatus.CONFLICT, message: 'Resource already exists' },
      P2025: {
        statusCode: HttpStatus.NOT_FOUND,
        message: exception.meta?.cause || exception.message,
      },
    };

    const data = exceptions[exception.code];
    if (!data) return super.catch(exception, host);

    res.status(data.statusCode).json(data);
  }
}
