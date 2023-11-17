import { Injectable , Inject, ExecutionContext,  UnauthorizedException} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserSchema } from 'src/schema/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { SessionToken } from 'src/schema/session.schema';
//import { EncryptionService } from 'src/encryption/encryption.service';
@Injectable()
export class AuthService {
    constructor( 
        @InjectModel(SessionToken.name) private readonly sessionModel: Model<SessionToken>,
        private usersService: UsersService,
        private jwtService: JwtService,
       // private encryptionService: EncryptionService
        ) { }

    async logIn(username: string, pass: string): Promise<any> {
        //validate username and password
        const user = await this.usersService.validateUser(username,pass);        
        //payload for token
        const payload = { _id: user._id, username: user.username };
        // store session in database to implement logout functionality.
        const session = await this.jwtService.signAsync(payload);
        //we can implement error handling here
        // encrypted plain jwt token
        //const encryptedToken = await this.encryptionService.encryptData(session,'tokenSecret')
        //store session in db for logout functionality
        const sessionToken = new this.sessionModel({ token:session, status: 'true' });
        sessionToken.save();
        return {
            access_token: session,
        };
        
    }

    async logOut(token: string):  Promise<any>{
        return this.sessionModel.updateOne({ token },{ $set: { status: false } });
    }
}

