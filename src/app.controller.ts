import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

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

  @Get()
  showDefaultrPage(@Res() res: Response) {
    return res.render('index', { title: 'Welcome to default page' });
  }
}
