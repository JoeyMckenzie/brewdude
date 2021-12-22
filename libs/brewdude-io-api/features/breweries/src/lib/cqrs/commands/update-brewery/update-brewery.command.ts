import { UpsertBreweryRequest } from '@brewdude/global/types';
import { ICommand } from '@nestjs/cqrs';

export class UpdateBreweryCommand implements ICommand {
  constructor(
    public readonly id: string,
    public readonly request: NonNullable<UpsertBreweryRequest>
  ) {}
}
