import { CreateBreweryCommandHandler } from './commands/create-brewery/create-brewery.handler';
import { GetBreweryQueryHandler } from './queries/get-brewery/get-brewery.handler';

export * from './commands/create-brewery/create-brewery.command';
export * from './queries/get-brewery/get-brewery.query';

export const handlers = [CreateBreweryCommandHandler, GetBreweryQueryHandler];
