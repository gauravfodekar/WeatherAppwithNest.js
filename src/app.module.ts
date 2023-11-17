import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { CookieParserMiddleware } from './middleware/cookieParser';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { WeatherModule } from './weather/weather.module';
import { ConfigModule } from '@nestjs/config/dist';
import { MongooseModule } from '@nestjs/mongoose';
import { SessionToken, SessionSchema } from 'src/schema/session.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:'.env',
      isGlobal: true
  }),
  MongooseModule.forFeature([{ name: SessionToken.name, schema: SessionSchema }]),
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
