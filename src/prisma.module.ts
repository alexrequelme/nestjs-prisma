import { DynamicModule, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { APP_FILTER } from '@nestjs/core';
import { PrismaExceptionsFilter } from './prisma-exceptions.filter';

@Module({})
export class PrismaModule {
  static forRoot(): DynamicModule {
    return {
      global: true,
      module: PrismaModule,
      providers: [PrismaService, { provide: APP_FILTER, useClass: PrismaExceptionsFilter }],
      exports: [PrismaService],
    };
  }
}
