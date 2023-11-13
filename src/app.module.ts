import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CookieParserMiddleware } from './middleware/cookieParser';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AuthController } from './auth/auth.controller';
import { UsersController } from './users/users.controller';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';
import { MongodBModule } from './mongodb/mongodb.module';

@Module({
  imports: [AuthModule, UsersModule, MongodBModule, MongodBModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Register CookieParserMiddleware as middleware for all routes
    consumer.apply(CookieParserMiddleware).forRoutes('*');
  }
}
