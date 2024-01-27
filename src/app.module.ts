import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { PrismaService } from './prisma/prisma.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [TaskModule, UserModule],
  providers: [PrismaService],
})
export class AppModule {}
