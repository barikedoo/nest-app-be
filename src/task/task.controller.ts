import { Controller, Post, Get, Param, Body, Put, Res } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './task.dto';
import { Response } from 'express';

@Controller('api/tasks')
export class TaskApiController {
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

@Controller('tasks')
export class TaskTemplateController {
  constructor(private taskService: TaskService) {}

  @Get('create')
  create(@Res() res: Response) {
    return res.render('tasks/create', {
      title: 'Create new task',
    });
  }

  @Get(':id')
  async getById(@Res() res: Response, @Param('id') id) {
    const task = await this.taskService.getById({ id: parseInt(id) });

    if (task) {
      return res.render('tasks/details', {
        title: `Task details: ${task.id}`,
        task,
      });
    } else {
      return res.render('error', {
        title: 'Holy shit',
        errorMessage: "The shit you're looking for does not exist, bro",
      });
    }
  }

  @Get()
  async getAll(@Res() res: Response) {
    return res.render('tasks/index', {
      title: 'All tasks',
      tasks: await this.taskService.getAll(),
    });
  }
}
