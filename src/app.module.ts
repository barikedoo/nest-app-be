import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { PrismaService } from './prisma/prisma.service';
import { UserModule } from './user/user.module';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TaskModule, UserModule, AuthModule],
  providers: [PrismaService],
  controllers: [AppController],
})
export class AppModule {}
