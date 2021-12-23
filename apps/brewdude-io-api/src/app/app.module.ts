import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BrewdudeIoApiSharedServicesModule } from '@brewdude/brewdude-io-api/shared/services';
import { BrewdudeIoApiFeaturesBreweriesModule } from '@brewdude/brewdude-io-api/features/breweries';
import { BrewdudeIoApiFeaturesUsersModule } from '@brewdude/brewdude-io-api/features/users';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppInterceptor } from './app.interceptor';

@Module({
  imports: [
    BrewdudeIoApiSharedServicesModule,
    BrewdudeIoApiFeaturesBreweriesModule,
    BrewdudeIoApiFeaturesUsersModule,
    ConfigModule.forRoot(),
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: AppInterceptor,
    },
  ],
})
export class AppModule {}
