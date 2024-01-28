import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { PrismaService } from './prisma/prisma.service';
import { UserModule } from './user/user.module';
import { AppController } from './app.controller';

@Module({
  imports: [TaskModule, UserModule],
  providers: [PrismaService],
  controllers: [AppController],
})
export class AppModule {}
