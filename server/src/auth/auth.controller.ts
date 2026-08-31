import { Body, Controller, Delete, Get, Post, Req, Res } from '@nestjs/common';

import { plainToInstance } from 'class-transformer';

import type { Request, Response } from 'express';

import { Throttle } from '@nestjs/throttler';

import { AuthService } from './auth.service';

import { Public } from './decorators/public.decorator';

import { UserLoginResponseDto } from './dto/user-login-response.dto';

import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @Post('login')
  async login(
    @Body() body: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, user } = await this.authService.login(
      body.email,
      body.password,
    );

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000,
    });

    return {
      message: 'Login successful',
      user: plainToInstance(UserLoginResponseDto, user, {
        excludeExtraneousValues: true,
      }),
    };
  }

  @Delete('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('accessToken');

    return {
      message: 'Logout successful',
    };
  }

  @Get('me')
  authMe(@Req() req: Request) {
    return plainToInstance(UserLoginResponseDto, req.user, {
      excludeExtraneousValues: true,
    });
  }
}
