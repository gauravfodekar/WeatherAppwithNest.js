import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { CookieParserMiddleware } from './middleware/cookieParser';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AuthController } from './auth/auth.controller';
import { UsersController } from './users/users.controller';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';
import { MongodBModule } from './mongodb/mongodb.module';
import { WeatherModule } from './weather/weather.module';
import { ConfigModule } from '@nestjs/config/dist';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:'.env',
      isGlobal: true
  }),
  MongooseModule.forRoot(process.env.DB_URI),
    AuthModule, UsersModule, WeatherModule],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Register CookieParserMiddleware as middleware for all routes
    console.log('DB_URI:', process.env.DB_URI);
    consumer.apply(CookieParserMiddleware).forRoutes('*');
  }
}
