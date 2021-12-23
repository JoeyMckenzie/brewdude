import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TokenService } from './services/token.service';
import { PassportJwtAuthGuard } from './guards/passport-jwt.guard';
import { PassportJwtStrategy } from './strategies/passport-jwt.strategy';
import { ScopesGuard } from './guards/scopes.guard';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('TOKEN_SECRET'),
        signOptions: {
          expiresIn: 3600,
        },
        verifyOptions: {
          ignoreExpiration: false,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    TokenService,
    PassportJwtStrategy,
    PassportJwtAuthGuard,
    ScopesGuard,
  ],
  exports: [TokenService],
})
export class BrewdudeIoApiFeaturesAuthenticationModule {}
