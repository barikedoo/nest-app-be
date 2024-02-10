import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './jwt.auth.guard';

@Module({
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    {
      provide: 'APP_GUARD',
      useClass: JwtAuthGuard,
    },
  ],
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
})
export class AuthModule {}
