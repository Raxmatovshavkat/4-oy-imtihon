import { Module } from '@nestjs/common';
import { BookModule } from './book/book.module';
import { AuthorModule } from './author/author.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { BorrowModule } from './borrow/borrow.module';
import { OtpModule } from './otp/otp.module';
import { MailModule } from './Mail/mail.module';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { LoggingInterceptor } from './log/logging.intercetor';
import { databaseConfig } from './config/db';
import { LogModule } from './log/log.module';

@Module({
  imports: [SequelizeModule.forRoot(databaseConfig()), ConfigModule.forRoot({
    envFilePath:".env",
    isGlobal:true
  }),BookModule, AuthorModule, UserModule, AuthModule, BorrowModule, OtpModule, UserModule, MailModule,LogModule],
  controllers: [],
  providers: [
    {
      provide: 'APP_INTERCEPTOR',
      useClass: LoggingInterceptor,
    },
  ], 
})
export class AppModule { }

