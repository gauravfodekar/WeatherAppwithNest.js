import { Controller, Body, HttpCode, Post, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { Public } from 'src/auth/decorators/public.decorator';
@Controller('users')
export class UsersController {
    constructor ( private userService: UsersService){}

    @HttpCode(HttpStatus.OK)
    @Public() // this is excluded from auth guard
    @Post('/signup')
    signUp(@Body() useDetails: Record<string, any>){
        return this.userService.createUser(useDetails.username,useDetails.pass)
    }
}
