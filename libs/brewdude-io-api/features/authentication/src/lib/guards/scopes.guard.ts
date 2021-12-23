import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class ScopesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const routeScopes = this.reflector.get<string[]>(
      'scopes',
      context.getHandler()
    );

    const userScopes: string[] = context.getArgs()[0].user.scopes;

    if (!routeScopes) {
      return true;
    }

    if (!userScopes) {
      return false;
    }

    return routeScopes.every((routeScope) => userScopes.includes(routeScope));
  }
}
