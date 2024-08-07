import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
dotenv.config()

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
  }));
  const port = process.env.DATABASE_PORT
  await app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
    
  });
}
bootstrap();
