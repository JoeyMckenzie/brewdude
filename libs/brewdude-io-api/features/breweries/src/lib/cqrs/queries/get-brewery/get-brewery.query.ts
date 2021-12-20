import { IQuery } from '@nestjs/cqrs';

export class GetBreweryQuery implements IQuery {
  constructor(public readonly breweryId: string) {}
}
