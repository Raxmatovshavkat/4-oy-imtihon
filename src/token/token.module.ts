import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { RefreshTokenService } from './token.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { RefreshToken } from './entities/token.entity';


@Module({
  imports: [
    SequelizeModule.forFeature([RefreshToken]),
    JwtModule.register({
      global: true,
    }),
  ],
  controllers:[],
  providers: [RefreshTokenService],
  exports: [RefreshTokenService],
})
export class RefreshTokenModule { }
