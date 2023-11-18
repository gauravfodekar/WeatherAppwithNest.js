import { Injectable , UnauthorizedException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { User, UserSchema } from '../schema/user.schema';

// This should be a real class/interface representing a user entity
@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) { }
  
    //register user 
    async createUser(username: string, pass: string): Promise<Object> {
      // find if duplicate exists.
      const exist = await this.findUserByUsername(username);
      if(exist) {
        console.log('User already exists.');
        throw new UnauthorizedException('User already exists.');
      }
      //hashing password - do not store plain password.
      pass = await bcrypt.hash(pass, 10);
      const user = await this.userModel.create({ username, pass });
      return { 
        "_id": user._id,
        "username": user.username
      }

    }
    // find user by username
    async findUserByUsername(username: string): Promise<User | null> {
      return this.userModel.findOne({ username }).exec();
    }
    // find user by its id.
    async findById(id: string): Promise<User | null> {
      return this.userModel.findById(id).exec();
    }
    //validate user password
    async validateUser(username: string, pass: string): Promise<User | null> {
      const user = await this.findUserByUsername(username);
  
      if (user && (await bcrypt.compare(pass, user.pass))) {
        return user;
      }
  
      return null;
    }
    
      
}
