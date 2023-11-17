import { Body, Controller, HttpCode, Get, HttpStatus, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Public() // This route is excluded from the AuthGuard
    @Post('login')
    logIn(@Body() loginDetails: Record<string, any>){
       try {
        return this.authService.logIn(loginDetails.username,loginDetails.pass)
       }catch(error){
        console.log(error);
       }
    }
    @Public() // This route is excluded from the AuthGuard
    @Post('logout')
    logOut(@Body() logoutDetails: Record<string, any>){
       try {
        return this.authService.logOut(logoutDetails.token)
       }catch(error){
        console.log(error);
       }
    }
    @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
