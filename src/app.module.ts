import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { AuthorModule } from './author/author.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { BorrowModule } from './borrow/borrow.module';
import { OtpModule } from './otp/otp.module';

@Module({
  imports: [BookModule, AuthorModule, UserModule, AuthModule, BorrowModule, OtpModule,UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
