import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, task } from '@prisma/client';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {
    //
  }

  create(payload): Promise<task> {
    console.log({ payload });
    return this.prisma.task.create({
      data: {
        title: payload.title,
        description: payload.description,
        author: {
          connect: { id: payload.authorId },
        },
      },
    });
  }

  delete(where: Prisma.taskWhereUniqueInput): Promise<task> {
    return this.prisma.task.delete({ where });
  }

  getById(where: Prisma.taskWhereUniqueInput): Promise<task | null> {
    return this.prisma.task.findUnique({ where });
  }

  update(params: {
    where: Prisma.taskWhereUniqueInput;
    data: Prisma.taskUpdateInput;
  }): Promise<task> {
    const { where, data } = params;
    return this.prisma.task.update({ data, where });
  }

  getAll(authorId?: string): Promise<task[]> {
    return this.prisma.task.findMany({
      where: { authorId: Number(authorId) },
    });
  }
}
