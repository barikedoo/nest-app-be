import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { PrismaService } from './prisma/prisma.service';
import { UserModule } from './user/user.module';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { HealthModule } from './health/health.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [TaskModule, UserModule, AuthModule, HealthModule, PrismaModule],
  providers: [PrismaService],
  controllers: [AppController],
})
export class AppModule {}
