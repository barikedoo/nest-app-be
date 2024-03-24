import { Module } from '@nestjs/common'
import { TaskModule } from './task/task.module'
import { PrismaService } from './prisma/prisma.service'
import { UserModule } from './user/user.module'
import { AppController } from './app.controller'
import { AuthModule } from './auth/auth.module'
import { HealthModule } from './health/health.module'
import { PrismaModule } from './prisma/prisma.module'
import { WSModule } from './websockets/ws.module'
import { OKXModule } from './okx/okx.module'
import { TelegramModule } from './telegram/telegram.module'

@Module({
  imports: [
    TaskModule,
    UserModule,
    AuthModule,
    HealthModule,
    PrismaModule,
    WSModule,
    OKXModule,
    TelegramModule,
  ],
  providers: [PrismaService],
  controllers: [AppController],
})
export class AppModule {}
