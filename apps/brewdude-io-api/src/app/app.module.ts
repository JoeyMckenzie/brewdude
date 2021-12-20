import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BrewdudeIoApiSharedServicesModule } from '@brewdude/brewdude-io-api/shared/services';
import { BrewdudeIoApiFeaturesBreweriesModule } from '@brewdude/brewdude-io-api/features/breweries';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    BrewdudeIoApiSharedServicesModule,
    BrewdudeIoApiFeaturesBreweriesModule,
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
