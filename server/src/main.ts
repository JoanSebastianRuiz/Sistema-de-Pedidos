import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';

import { NestExpressApplication } from '@nestjs/platform-express';

import { BadRequestException, ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { join } from 'path';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(process.cwd(), 'public'));

  app.use(cookieParser());

  app.use(
    helmet({
      crossOriginEmbedderPolicy: false,
      crossOriginOpenerPolicy: true,
    }),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (errors) => {
        const messages = errors.flatMap((error) => {
          if (error.constraints?.whitelistValidation) {
            return [`FIELD_NOT_ALLOWED_${error.property.toUpperCase()}`];
          }

          return Object.values(error.constraints || {});
        });

        return new BadRequestException({
          message: messages,
        });
      },
    }),
  );

  app.setGlobalPrefix('api');

  app.enableCors({
    origin: process.env.ALLOWED_ORIGINS?.split(','),
    credentials: true,
  });

  app.disable('x-powered-by');

  app.set('trust proxy', 1);

  const reflector = app.get(Reflector);

  app.useGlobalGuards(new JwtAuthGuard(reflector));

  await app.listen(process.env.PORT!);
}

bootstrap();
