import { Module } from '@nestjs/common';
import { TaskApiController } from './task.controller';
import { TaskTemplateController } from './tasks.views.controller';
import { TaskService } from './task.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [TaskApiController, TaskTemplateController],
  providers: [TaskService, PrismaService],
})
export class TaskModule {}
