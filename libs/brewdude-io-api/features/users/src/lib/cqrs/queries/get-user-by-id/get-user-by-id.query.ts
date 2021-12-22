import { IQuery } from '@nestjs/cqrs';

// TODO: Look into IQuery<TResult>
export class GetUserByIdQuery implements IQuery {
  constructor(public readonly userId: string) {}
}
