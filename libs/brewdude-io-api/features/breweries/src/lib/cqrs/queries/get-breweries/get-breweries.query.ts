import { SortOrder } from '@brewdude/global/types';
import { IQuery } from '@nestjs/cqrs';

export class GetBreweriesQuery implements IQuery {
  constructor(
    public readonly limit = '10',
    public readonly offset = '0',
    public readonly sort: SortOrder = SortOrder.Ascending
  ) {}
}
