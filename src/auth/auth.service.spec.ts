import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import * as bcryptjs from 'bcryptjs';

jest.mock('bcryptjs', () => ({
  hash: jest.fn(),
  compare: jest.fn(),
}));

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            create: jest.fn(),
            findByEmailWithPassword: jest.fn(),
            findOneByEmail: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('register', () => {
    it('should register a new user', async () => {
      const registerDto = { email: 'test@example.com', password: 'Password123', name: 'Test', manager: 'Manager' };
      (bcryptjs.hash as jest.Mock).mockResolvedValue('hashedPassword');
      (usersService.create as jest.Mock).mockResolvedValue(undefined);

      const result = await service.register(registerDto);

      expect(result).toEqual({ email: 'test@example.com' });
      expect(usersService.create).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'hashedPassword',
        name: 'Test',
        manager: 'Manager',
      });
    });

    it('should throw BadRequestException if user creation fails', async () => {
      const registerDto = { email: 'test@example.com', password: 'Password123', name: 'Test', manager: 'Manager' };
      (bcryptjs.hash as jest.Mock).mockResolvedValue('hashedPassword');
      (usersService.create as jest.Mock).mockRejectedValue(new Error('User creation error'));

      await expect(service.register(registerDto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('login', () => {
    it('should login a user and return a token', async () => {
      const loginDto = { email: 'test@example.com', password: 'Password123' };
      const user = { email: 'test@example.com', password: 'hashedPassword', role: 'USER' };
      (usersService.findByEmailWithPassword as jest.Mock).mockResolvedValue(user);
      (bcryptjs.compare as jest.Mock).mockResolvedValue(true);
      (jwtService.signAsync as jest.Mock).mockResolvedValue('token');

      const result = await service.login(loginDto);

      expect(result).toEqual({ token: 'token', email: 'test@example.com' });
    });

    it('should throw UnauthorizedException if email or password is incorrect', async () => {
      const loginDto = { email: 'test@example.com', password: 'Password123' };
      (usersService.findByEmailWithPassword as jest.Mock).mockResolvedValue(null);

      await expect(service.login(loginDto)).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('profile', () => {
    it('should return user profile', async () => {
      const user = { email: 'test@example.com', role: 'USER' };
      const foundUser = { email: 'test@example.com', name: 'Test User' };
      (usersService.findOneByEmail as jest.Mock).mockResolvedValue(foundUser);

      const result = await service.profile(user);

      expect(result).toEqual(foundUser);
    });
  });
});
