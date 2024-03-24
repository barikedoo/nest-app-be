import { HttpException, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateUserDto, UpdateUserDto } from './dto/user.dto'
import { hash } from 'src/utils/hashing'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(payload: CreateUserDto) {
    const alreadyExists = await this.getByEmail(payload.email)

    console.log({ alreadyExists, payload })

    if (alreadyExists) throw new HttpException('User already exists', 409)

    const data = {
      ...payload,
      password: await hash(payload.password),
    }

    return await this.prisma.user.create({ data })
  }

  getAll() {
    return this.prisma.user.findMany({ select: { password: false } })
  }

  getBydId(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      select: { password: false },
    })
  }

  getByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    })
  }

  delete(id: number) {
    return this.prisma.user.delete({
      where: { id },
      select: { password: false },
    })
  }

  update(id: number, payload: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: payload,
      select: { password: false },
    })
  }
}
