import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { Public } from './auth/public.decorator';

@Controller()
export class AppController {
  @Get('login')
  showLoginPage(@Res() res: Response) {
    return res.render('login', { title: 'Please Log In to continue' });
  }

  @Get('register')
  showRegisterPage(@Res() res: Response) {
    return res.render('login', { title: 'Registration' });
  }

  @Public()
  @Get()
  showDefaultPage(@Res() res: Response) {
    return res.render('index', { title: 'Welcome to default page' });
  }
}
