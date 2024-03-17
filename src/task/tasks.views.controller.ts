import { Controller, Post, Get, Param, Body, Res, Req } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/task.dto';
import { Response, Request } from 'express';

@Controller('tasks')
export class TaskTemplateController {
  constructor(private taskService: TaskService) {}

  // Create a task
  @Get('create')
  showCreateTaskView(@Res() res: Response) {
    return res.render('tasks/create', {
      title: 'Create new task',
    });
  }

  @Post('create')
  async createNewPost(
    @Body() body: CreateTaskDto,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const task = await this.taskService.create({
      ...body,
      authorId: Number(req.user.id),
    });

    return res.redirect(`/tasks/${task.id}`);
  }

  @Get(':id')
  async showTaskDetailsView(@Res() res: Response, @Param('id') id) {
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
  async showAllTasksView(@Res() res: Response) {
    return res.render('tasks/index', {
      title: 'All tasks',
      tasks: await this.taskService.getAll(),
    });
  }
}
