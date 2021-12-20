import { CreateBreweryRequest } from '@brewdude/global/types';
import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { from } from 'rxjs';

@Controller('beers')
export class BeersController {
  constructor(private commandBus: CommandBus) {}
}
