import { Injectable } from '@nestjs/common';
import { CreateRegisterDto } from '../user/dto/register-user.dto';
import { CreateLoginDto } from '../user/dto/login-user.dto ';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenService } from '../token/token.service';
import { CreateOtpDto } from '../otp/dto/create-otp.dto';


@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly refreshService: RefreshTokenService
  ) { }

  async signup(createRegisterDto: CreateRegisterDto) {
    return await this.userService.register(createRegisterDto);
  }

  async verify(createOtpDto: CreateOtpDto) {
    return await this.userService.verifyOtp(createOtpDto);
  }

  async signIn(createLoginDto: CreateLoginDto): Promise<{ accessToken: string, refreshToken: string }> {
    const user = await this.userService.signin(createLoginDto);

    const accessTokenSecret = process.env.DATABASE_ACCESS_TOKEN_SECRET;
    const refreshTokenSecret = process.env.DATABASE_REFRESH_TOKEN_SECRET;

    if (!accessTokenSecret || !refreshTokenSecret) {
      throw new Error('JWT secret not configured');
    }

    const payload = { sub: user.id, email: user.email };
    const accessToken = this.jwtService.sign(payload, { secret: accessTokenSecret, expiresIn: '5m' });
    const refreshToken = this.jwtService.sign(payload, { secret: refreshTokenSecret, expiresIn: '7d' });

    await this.refreshService.storeRefreshToken({ token: refreshToken, userId: user.id, expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) });
    return {
      accessToken,
      refreshToken
    };
  }

  async me(id: number) {
    return await this.userService.findOne(id);
  }

  async logout(id: number) {
    await this.refreshService.removeTokensForUser(id);
  }

  async refreshAccessToken(refreshToken: string) {
    await this.refreshService.refreshAccessToken(refreshToken);
  }
}
