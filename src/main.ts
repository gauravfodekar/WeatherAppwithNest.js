import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
 try{
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
 } catch(err)
{
  console.log(err);
}  
 
}
bootstrap();
