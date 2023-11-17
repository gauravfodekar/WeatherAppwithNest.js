import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  
  import { InjectModel } from '@nestjs/mongoose';
  import { Model } from 'mongoose';
  import { Reflector } from '@nestjs/core';
  import { JwtService } from '@nestjs/jwt';
  import { Request } from 'express';
  import { jwtConstants } from './constants';
  import { IS_PUBLIC_KEY } from './decorators/public.decorator';
  import { SessionToken } from 'src/schema/session.schema';
  
  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(
      @InjectModel(SessionToken.name) private readonly sessionModel: Model<SessionToken>,
      private jwtService: JwtService,
      private reflector: Reflector,
    ) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);
      if (isPublic) {
        // 💡 See this condition
        return true;
      }
  
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
      if (!token) {
        throw new UnauthorizedException();
      }
      try {
        //check if token is logged out token
        const loggedOut = await this.getTokenStatus(token);
        if (!loggedOut) {
          throw new UnauthorizedException();
        }
        // TODO: we can use decryption method here if token encrypted
        const payload = await this.jwtService.verifyAsync(token, {
          secret: jwtConstants.secret,
        });
        // 💡 We're assigning the payload to the request object here
        // so that we can access it in our route handlers
        request['user'] = payload;
      } catch(error) {
        throw new UnauthorizedException();
      }
      return true;
    }
  
    private extractTokenFromHeader(request: Request): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    }

    private getTokenStatus(sessionToken: string): Promise<any> {
      return this.sessionModel.findOne({ token: sessionToken, status: 'true' }).exec();
    }
  }