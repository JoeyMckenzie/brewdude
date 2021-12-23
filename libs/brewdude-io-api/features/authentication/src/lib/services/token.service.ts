import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from '@prisma/client';
import { from } from 'rxjs';

@Injectable()
export class TokenService {
  constructor(private jwtService: JwtService) {}

  generateToken(
    id: string,
    username: string,
    email: string,
    verified: boolean,
    role: UserRole
  ) {
    const signingPayload = {
      id,
      username,
      email,
      verified,
      role,
      scopes: ['brewery:create'],
    };

    return from(this.jwtService.signAsync(signingPayload));
  }
}
