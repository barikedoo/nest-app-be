import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto, UpdateUserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateUserDto) {
    return this.prisma.user.create({ data });
  }

  getAll() {
    return this.prisma.user.findMany();
  }

  getBydId(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  delete(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }

  update(id: number, payload: UpdateUserDto) {
    return this.prisma.user.update({ where: { id }, data: payload });
  }
}
