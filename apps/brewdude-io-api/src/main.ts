/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { catchError, EMPTY, exhaustMap, firstValueFrom, from, map } from 'rxjs';

import { AppModule } from './app/app.module';
import { RequestLoggingInterceptor } from './app/interceptors/request-timer.interceptor';
import { TimeoutInterceptor } from './app/interceptors/timeout.interceptor';

const bootstrapObservable = from(NestFactory.create(AppModule)).pipe(
  exhaustMap((app) => {
    const globalPrefix = 'api';
    const port = process.env.PORT || 3333;

    app.setGlobalPrefix(globalPrefix);
    app.useGlobalPipes(new ValidationPipe());

    app.useGlobalInterceptors(
      new RequestLoggingInterceptor(),
      new TimeoutInterceptor()
    );

    app.enableVersioning({
      type: VersioningType.URI,
    });

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
