import { CreateBreweryRequest } from '@brewdude/global/types';
import { ICommand } from '@nestjs/cqrs';

export class CreateBreweryCommand implements ICommand {
  constructor(public readonly request: NonNullable<CreateBreweryRequest>) {}
}
