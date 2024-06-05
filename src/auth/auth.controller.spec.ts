import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { Role } from 'src/roles/enum/role.enum';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn(),
            register: jest.fn(),
            profile: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
            verifyAsync: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should login a user', async () => {
      const loginDto: LoginDto = { email: 'test@example.com', password: 'Password123' };
      const result = { token: 'token', email: 'test@example.com', role: Role.RESTAURANT };

      jest.spyOn(service, 'login').mockResolvedValue(result);

      expect(await controller.login(loginDto)).toBe(result);
    });

    it('should throw UnauthorizedException if login fails', async () => {
      const loginDto: LoginDto = { email: 'test@example.com', password: 'Password123' };

      jest.spyOn(service, 'login').mockRejectedValue(new UnauthorizedException());

      await expect(controller.login(loginDto)).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('register', () => {
    it('should register a user', async () => {
      const registerDto: RegisterDto = { email: 'test@example.com', password: 'Password123' };
      const result = { email: 'test@example.com' };

      jest.spyOn(service, 'register').mockResolvedValue(result);

      expect(await controller.register(registerDto)).toBe(result);
    });

    it('should throw BadRequestException if registration fails', async () => {
      const registerDto: RegisterDto = { email: 'test@example.com', password: 'Password123' };

      jest.spyOn(service, 'register').mockRejectedValue(new BadRequestException());

      await expect(controller.register(registerDto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('profile', () => {
    it('should return user profile', async () => {
      const user = { email: 'test@example.com', role: 'USER' };
      const result = { email: 'test@example.com', name: 'Test User' };

      jest.spyOn(service, 'profile').mockResolvedValue(result as any);

      expect(await controller.profile(user)).toBe(result);
    });
  });
});
