import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { MailModule } from 'src/Mail/mail.module';
import { OtpModule } from 'src/otp/otp.module';


@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    MailModule,
    OtpModule],
  controllers: [],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule { }
