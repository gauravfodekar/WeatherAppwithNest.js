import { NestFactory } from '@nestjs/core';
import { UnauthorizedException } from '@nestjs/common';
import { AppModule } from './app.module';
import helmet from 'helmet';

async function bootstrap() {
 try{
  const app = await NestFactory.create(AppModule);
  // Use helmet as a global middleware
  app.use(helmet());
  app.enableCors();
  await app.listen(3000);
 } catch(err){
  throw new UnauthorizedException('Error occure while initializing server...');
}  
 
}
bootstrap();
