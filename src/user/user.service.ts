import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { hash } from 'src/utils/hashing';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(payload: CreateUserDto) {
    const data = {
      ...payload,
      password: await hash(payload.password),
    };

    const user = await this.prisma.user.create({ data });

    delete user.password;

    return user;
  }

  getAll() {
    return this.prisma.user.findMany();
  }

  getBydId(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  getByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  delete(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }

  update(id: number, payload: UpdateUserDto) {
    return this.prisma.user.update({ where: { id }, data: payload });
  }
}
