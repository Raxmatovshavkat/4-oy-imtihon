import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { MailModule } from 'src/Mail/mail.modue';


@Module({
  imports:[SequelizeModule.forFeature([User]),
MailModule],
  controllers: [],
  providers: [UserService],
  exports:[UserService]
})
export class UserModule {}
