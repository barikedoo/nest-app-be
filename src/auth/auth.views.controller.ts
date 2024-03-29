import {
  Controller,
  Get,
  Post,
  Res,
  UseGuards,
  Body,
  Req,
} from '@nestjs/common'
import { Response, Request } from 'express'
import { Public } from './decorators/public.decorator'
import { UserService } from 'src/user/user.service'
import { LocalAuthGuard } from './local.auth.guard'
import { AuthService } from './auth.service'
import { CreateUserDto } from 'src/user/dto/user.dto'

@Controller('')
export class AuthViewsController {
  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  // Show login page
  @Get('login')
  @Public()
  showLoginPage(@Res() res: Response) {
    return res.render('auth/login', { title: 'Please Log In to continue' })
  }

  // Show login success page
  // @UseGuards(LocalAuthGuard)
  @Get('login/success')
  @Public()
  showLoginSuccessPage(@Res() res: Response) {
    return res.render('success', {
      title: 'Login Success',
      message: `<p>You have successfully logged in. Here is your token</p>`,
    })
  }

  // Login request
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @Public()
  async login(@Res() res: Response, @Req() req: Request) {
    const { access_token } = await this.authService.login(req.user)

    res.cookie('Authorization', access_token, {
      httpOnly: true,
      path: '/',
      maxAge: 3600000,
    })

    return res.redirect('/login/success')
  }

  // Show register page
  @Get('register')
  @Public()
  showRegisterPage(@Res() res: Response) {
    return res.render('auth/register', { title: 'Registration' })
  }

  // Show success register page
  @Get('register/success')
  @Public()
  showRegisterSuccessPage(@Res() res: Response) {
    return res.render('success', {
      title: 'Registration succesful',
      message: 'Now you can use our app',
    })
  }

  // Create a new user
  @Post('register')
  @Public()
  async register(@Body() payload: CreateUserDto, @Res() res: Response) {
    try {
      await this.userService.create(payload)

      return res.redirect('/register/success')
    } catch (error) {
      return res.render('error', {
        title: 'User already exists',
        error: 'Please use different email',
      })
    }
  }
}
