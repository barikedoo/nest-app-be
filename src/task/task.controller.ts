import { Controller, Post, Get, Param, Body, Put, Req } from '@nestjs/common'
import { TaskService } from './task.service'
import { CreateTaskDto } from './dto/task.dto'
import { Request } from 'express'

@Controller('api/tasks')
export class TaskApiController {
  constructor(private taskService: TaskService) {}

  @Post()
  create(@Body() body: CreateTaskDto, @Req() req) {
    return this.taskService.create({ ...body, authorId: Number(req.user.id) })
  }

  @Get(':id')
  getById(@Param('id') id) {
    return this.taskService.getById({ id: parseInt(id) })
  }

  @Get()
  getAll(@Req() req: Request) {
    return this.taskService.getAll(req.user.id)
  }

  @Put(':id')
  update(@Param('id') id, @Body() body: CreateTaskDto) {
    return this.taskService.update({
      where: { id: parseInt(id) },
      data: body,
    })
  }
}
