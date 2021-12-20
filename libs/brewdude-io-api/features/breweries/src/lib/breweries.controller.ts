import {
  CreateBreweryRequest,
  BreweryResponse,
  BreweryListResponse,
  SortOrder,
} from '@brewdude/global/types';
import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateBreweryCommand } from './cqrs';
import { GetBreweryQuery } from './cqrs/queries/get-brewery/get-brewery.query';
import { from, Observable } from 'rxjs';
import { GetBreweriesQuery } from './cqrs/queries/get-breweries/get-breweries.query';

@Controller('breweries')
export class BreweriesController {
  private readonly logger = new Logger(BreweriesController.name);

  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @Post()
  createBrewery(
    @Body() request: CreateBreweryRequest
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
