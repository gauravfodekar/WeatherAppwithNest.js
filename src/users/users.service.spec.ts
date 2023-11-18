// users.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getModelToken } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserSchema } from '../schema/user.schema';
import { Injectable , UnauthorizedException} from '@nestjs/common';
import { Model } from 'mongoose';

describe('UsersService', () => {
  let usersService: UsersService;
  let userModel: Model<any>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: {
            findOne: jest.fn(),
            findById: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    userModel = module.get<Model<any>>(getModelToken(User.name));
  });

      describe('createUser', () => {
        it('should create a new user', async () => {
          const username = 'john_doe';
          const password = 'password123';
      
          // Mocking the findUserByUsername method to return null (indicating user does not exist)
          jest.spyOn(usersService, 'findUserByUsername').mockResolvedValue(null);
      
          // Mocking bcrypt.hash method
          jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashedPassword');
      
          // Creating a mock user instance using create method
          const mockUser: User = {
            _id: '1',
            username,
            pass: 'hashedPassword',
          } as User;
      
          // Mocking the save method of the user model instance
          jest.spyOn(usersService, 'createUser').mockResolvedValue(mockUser);
      
          const result = await usersService.createUser(username, password);
      
          expect(result).toEqual(mockUser);
        });

    it('should throw UnauthorizedException if the user already exists', async () => {
      const username = 'john_doe';
      const password = 'password123';

       // Mocking the findUserByUsername method to return an existing user
        // Mocking the findUserByUsername method to return an existing user
        const existingUser: User = {
          _id: '1',
          username,
          pass: 'hashedPassword',
        } as User;
      // Mocking the findUserByUsername method to return an existing user
      jest.spyOn(usersService, 'findUserByUsername').mockResolvedValue(existingUser);

      await expect(usersService.createUser(username, password)).rejects.toThrowError(UnauthorizedException);
    });
  });

  // Add more test cases for other methods in the UsersService if needed
});
