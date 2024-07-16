import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { RefreshTokenService } from './token.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { RefreshToken } from './entities/token.entity';
import { TokenController } from './token.controller';

@Module({
  imports: [
    SequelizeModule.forFeature([RefreshToken]),
    JwtModule.register({
      global: true,
    }),
  ],
  controllers:[TokenController],
  providers: [RefreshTokenService],
  exports: [RefreshTokenService],
})
export class RefreshTokenModule { }
