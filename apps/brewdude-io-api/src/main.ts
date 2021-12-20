/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { catchError, EMPTY, exhaustMap, firstValueFrom, from, map } from 'rxjs';

import { AppModule } from './app/app.module';

const bootstrapObservable = from(NestFactory.create(AppModule)).pipe(
  exhaustMap((app) => {
    const globalPrefix = 'api/v1';
    const port = process.env.PORT || 3333;

    app.setGlobalPrefix(globalPrefix);
    app.useGlobalPipes(new ValidationPipe());

    return from(app.listen(port)).pipe(
      map(() =>
        Logger.log(
          `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
        )
      ),
      catchError((error) => {
        Logger.error(error);
        return EMPTY;
      })
    );
  })
);

firstValueFrom(bootstrapObservable);
