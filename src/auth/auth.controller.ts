import { Controller, Get, Post, Body, Param, Delete, ValidationPipe, UsePipes, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateRegisterDto } from '../user/dto/register-user.dto';
import { CreateLoginDto } from '../user/dto/login-user.dto ';
import { JwtAuthGuard } from 'src/guard/guard';
import { RefreshTokenDto } from '../token/dto/create-token.dto';
import { CreateOtpDto } from '../otp/dto/create-otp.dto'; 

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) { }

  @Post('register')
  @UsePipes(ValidationPipe)
  async signUp(@Body() createRegisterDto: CreateRegisterDto) {
    return await this.authService.signup(createRegisterDto);
  }

  @Post('login')
  async signIn(@Body() createLoginDto: CreateLoginDto) {
    return await this.authService.signIn(createLoginDto);
  }

  @Get('me/:id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string) {
    return await this.authService.me(+id);
  }

  @Delete('logout/:id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string) {
    return await this.authService.logout(+id);
  }

  @Post('refresh')
  async refreshAccessToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return await this.authService.refreshAccessToken(refreshTokenDto.token);
  }

  @Post('verify')
  @UsePipes(ValidationPipe) 
  async verify(@Body() createOtpDto: CreateOtpDto) {
    return await this.authService.verify(createOtpDto);
  }
}
