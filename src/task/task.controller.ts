import { Controller, Post, Get, Param, Body, Put } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './task.dto';

@Controller('tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Post()
  create(@Body() body: CreateTaskDto) {
    return this.taskService.create(body);
  }

  @Get(':id')
  getById(@Param('id') id) {
    return this.taskService.getById({ id: parseInt(id) });
  }

  @Get()
  getAll() {
    return this.taskService.getAll();
  }

  @Put(':id')
  update(@Param('id') id, @Body() body: CreateTaskDto) {
    return this.taskService.update({
      where: { id: parseInt(id) },
      data: body,
    });
  }
}
