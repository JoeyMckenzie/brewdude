import { CreateBreweryCommandHandler } from './commands/create-brewery/create-brewery.handler';
import { GetBreweryQueryHandler } from './queries/get-brewery/get-brewery.handler';
import { GetBreweriesQueryHandler } from './queries/get-breweries/get-breweries.handler';
import { UpdateBreweryCommandHandler } from './commands/update-brewery/update-brewery.handler';

export * from './commands/create-brewery/create-brewery.command';
export * from './commands/update-brewery/update-brewery.command';
export * from './queries/get-brewery/get-brewery.query';
export * from './queries/get-breweries/get-breweries.query';

export const handlers = [
  CreateBreweryCommandHandler,
  GetBreweryQueryHandler,
  GetBreweriesQueryHandler,
  UpdateBreweryCommandHandler,
];
