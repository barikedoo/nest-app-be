import { Controller, Post, Get, Param, Body, Put, Req } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './task.dto';
import { Request } from 'express';

@Controller('api/tasks')
export class TaskApiController {
  constructor(private taskService: TaskService) {}

  @Post()
  create(@Body() body: CreateTaskDto, @Req() req: Request) {
    return this.taskService.create({ ...body, author: req.user });
  }

  @Get(':id')
  getById(@Param('id') id) {
    return this.taskService.getById({ id: parseInt(id) });
  }

  @Get()
  getAll(id?: string) {
    return this.taskService.getAll(id);
  }

  @Put(':id')
  update(@Param('id') id, @Body() body: CreateTaskDto) {
    return this.taskService.update({
      where: { id: parseInt(id) },
      data: body,
    });
  }
}
