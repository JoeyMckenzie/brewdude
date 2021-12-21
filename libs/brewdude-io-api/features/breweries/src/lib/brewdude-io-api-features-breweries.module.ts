import { BrewdudeIoApiSharedServicesModule } from '@brewdude/brewdude-io-api/shared/services';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { BreweriesController } from './breweries.controller';
import { handlers } from './cqrs';
import { BreweryService } from './services/brewery.service';

@Module({
  imports: [CqrsModule, BrewdudeIoApiSharedServicesModule],
  controllers: [BreweriesController],
  providers: [...handlers, BreweryService],
})
export class BrewdudeIoApiFeaturesBreweriesModule {}
