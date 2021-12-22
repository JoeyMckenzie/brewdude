import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BrewdudeIoApiSharedServicesModule } from '@brewdude/brewdude-io-api/shared/services';
import { BrewdudeIoApiFeaturesBreweriesModule } from '@brewdude/brewdude-io-api/features/breweries';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BrewdudeIoApiFeaturesUsersModule } from '@brewdude/brewdude-io-api/features/users';

@Module({
  imports: [
    BrewdudeIoApiSharedServicesModule,
    BrewdudeIoApiFeaturesBreweriesModule,
    BrewdudeIoApiFeaturesUsersModule,
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
