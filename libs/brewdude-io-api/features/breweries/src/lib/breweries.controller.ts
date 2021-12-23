import {
  UpsertBreweryRequest,
  BreweryResponse,
  BreweryListResponse,
  SortOrder,
} from '@brewdude/global/types';
import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  UseGuards,
  Version,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateBreweryCommand } from './cqrs';
import { GetBreweryQuery } from './cqrs/queries/get-brewery/get-brewery.query';
import { from, Observable } from 'rxjs';
import { GetBreweriesQuery } from './cqrs/queries/get-breweries/get-breweries.query';
import {
  PassportJwtAuthGuard,
  Scopes,
  ScopesGuard,
} from '@brewdude/brewdude-io-api/features/authentication';

@Controller({
  path: 'breweries',
  version: '1',
})
export class BreweriesController {
  private readonly logger = new Logger(BreweriesController.name);

  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @UseGuards(PassportJwtAuthGuard, ScopesGuard)
  @Scopes('brewery:create')
  @Post()
  createBrewery(
    @Body() request: UpsertBreweryRequest
  ): Observable<BreweryResponse> {
    this.logger.log('Request received to create brewery...');
    return from(this.commandBus.execute(new CreateBreweryCommand(request)));
  }

  @Get()
  findBreweries(
    @Param() offset: string,
    @Param() limit: string,
    @Param() sort: string
  ): Observable<BreweryListResponse> {
    this.logger.log('Request received to retrieve breweries...');
    return from(
      this.queryBus.execute(
        new GetBreweriesQuery(
          offset,
          limit,
          sort === SortOrder.Ascending
            ? SortOrder.Ascending
            : SortOrder.Descending
        )
      )
    );
  }

  @Get(':id')
  findBrewery(@Param() requestId: { id: string }): Observable<BreweryResponse> {
    this.logger.log('Request received to retrieve brewery...');
    return from(this.queryBus.execute(new GetBreweryQuery(requestId.id)));
  }
}
