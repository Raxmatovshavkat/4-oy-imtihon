// auth.controller.ts
import { Controller, Get, Post, Body, Param, Delete, UsePipes, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateRegisterDto } from '../user/dto/register-user.dto';
import { CreateLoginDto } from '../user/dto/login-user.dto ';
import { RolesGuard } from '../guard/roles.guard';
import { RefreshTokenDto } from '../token/dto/create-token.dto';
import { CreateOtpDto } from '../otp/dto/create-otp.dto';
import { Roles } from '../guard/roles.decorator';
import { JwtAuthGuard } from 'src/guard/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  @UsePipes(ValidationPipe)
  async signUp(@Body() createRegisterDto: CreateRegisterDto) {
    return await this.authService.signup(createRegisterDto);
  }

  @Post('login')
  async signIn(@Body() createLoginDto: CreateLoginDto) {
    return await this.authService.signIn(createLoginDto);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin','librarian','user')
  async findOne(@Param('id') id: string) {
    return await this.authService.me(+id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin','librarian')
  async remove(@Param('id') id: number) {
    return await this.authService.logout(+id);
  }

  @Post('refresh')
  async refresh(@Body('refreshToken') refreshToken: string) {
    return this.authService.refreshAccessToken(refreshToken);
  }

  @Post('verify')
  async verify(@Body() createOtpDto: CreateOtpDto) {
    const { id: userId, otp } = createOtpDto as any;
    console.log(createOtpDto);

    return await this.authService.verify(userId, otp);
  }
}

