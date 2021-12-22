import { UserRole } from '@prisma/client';

export interface UserDto {
  email: string;
  username: string;
  verified: boolean;
  role: UserRole;
}
