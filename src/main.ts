import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(new LoggerMiddleware().use);
  app.use(cookieParser());

  app.useGlobalPipes(new ValidationPipe());

  app.setBaseViewsDir(join(__dirname, '..', 'templates'));
  app.setViewEngine('hbs');

  await app.listen(process.env.PORT || 3000);
}
bootstrap();

// Temporary put here
declare module 'Express' {
  export interface Request {
    user?: {
      id: string;
      email: string;
    };
  }
}
