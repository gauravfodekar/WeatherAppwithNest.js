import { Injectable , ExecutionContext,  UnauthorizedException} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor( 
        private usersService: UsersService,
        private jwtService: JwtService
        ) { }

    async logIn(username: string, pass: string): Promise<any> {
        //validate username and password
        const user = await this.usersService.validateUser(username,pass);        
        //payload for token
        const payload = { _id: user._id, username: user.username };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
        
    }
}

