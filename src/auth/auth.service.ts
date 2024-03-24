import { UserService } from './../user/user.service'
import { Injectable, HttpException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { compareHash } from 'src/utils/hashing'

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string) {
    const user = await this.userService.getByEmail(email)
    const passMatch = await compareHash(pass, user?.password || '')

    if (passMatch) {
      delete user.password

      return user
    }

    throw new HttpException('Invalid credentials', 401)
  }

  async login(user: any) {
    return {
      access_token: this.jwtService.sign(user),
    }
  }
}
