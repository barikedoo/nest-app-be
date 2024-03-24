import { Controller, Get, Res } from '@nestjs/common'
import { Public } from './auth/decorators/public.decorator'
import { Response } from 'express'

@Controller()
export class AppController {
  // Index page
  @Public()
  @Get()
  showDefaultPage(@Res() res: Response) {
    return res.render('index', { title: 'Welcome to home page' })
  }
}
