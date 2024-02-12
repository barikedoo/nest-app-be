import { Controller, Get, Post, Res, UseGuards, Body } from '@nestjs/common';
import { Response } from 'express';
import { Public } from '../auth/public.decorator';
import { UserService } from 'src/user/user.service';
import { LocalAuthGuard } from './local.auth.guard';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/user.dto';

@Controller('')
export class AuthViewsController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  // Show login page
  @Get('login')
  @Public()
  showLoginPage(@Res() res: Response) {
    return res.render('auth/login', { title: 'Please Log In to continue' });
  }

  // @UseGuards(LocalAuthGuard)
  @Get('login/success')
  @Public()
  showLoginSuccessPage(@Res() res: Response) {
    return res.render('success', {
      title: 'Login Success',
      message: `You have successfully logged in. Here is your token`,
    });
  }

  // Create a new user
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @Public()
  async login(@Body() body: LoginDto, @Res() res: Response) {
    await this.authService.login(body);

    return res.redirect('/login/success');
  }

  @Get('register')
  @Public()
  showRegisterPage(@Res() res: Response) {
    return res.render('auth/register', { title: 'Registration' });
  }

  @Post('register')
  @Public()
  async register(@Body() payload: CreateUserDto, @Res() res: Response) {
    const user = await this.userService.create(payload);

    return res.redirect('/success');
  }
}
