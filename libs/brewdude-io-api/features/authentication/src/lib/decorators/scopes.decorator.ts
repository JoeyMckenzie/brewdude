import { SetMetadata } from '@nestjs/common';

export const Scopes = (...permissions: string[]) =>
  SetMetadata('scopes', permissions);
