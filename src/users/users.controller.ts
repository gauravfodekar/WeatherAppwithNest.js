import { Controller, Body, HttpCode, Post, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor ( private userService: UsersService){}

    @HttpCode(HttpStatus.OK)
    @Post('/signup')
    signUp(@Body() useDetails: Record<string, any>){
        return this.userService.createUser(useDetails.username,useDetails.pass)
    }
}
