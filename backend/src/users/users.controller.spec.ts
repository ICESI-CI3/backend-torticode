import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateRestaurantDto } from '../roles/dto/create-restaurant.dto';
import { CreateStudentDto } from '../roles/dto/create-student.dto';
import { UpdateStudentDto } from '../roles/dto/update-student.dto';
import { UpdateRestaurantDto } from '../roles/dto/update-restaurant.dto';
import { Role } from '../roles/enum/role.enum';
import { User } from './entities/user.entity';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
            findByRole: jest.fn(),
            updateBalance: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createRestaurant', () => {
    it('should create a new restaurant', async () => {
      const dto: CreateRestaurantDto = {
        email: 'test@restaurant.com',
        password: 'Test1234',
        name: 'Restaurant Name',
        nit: 123456789,
        manager: 'Manager Name',
        phone: '1234567890',
      };

      const result = new User();
      jest.spyOn(service, 'create').mockResolvedValue(result);

      expect(await controller.createRestaurant(dto)).toBe(result);
    });
  });

  describe('createStudent', () => {
    it('should create a new student', async () => {
      const dto: CreateStudentDto = {
        email: 'test@student.com',
        password: 'Test1234',
        name: 'John',
        lastname: 'Doe',
        dni: 12345678,
        code: '20210001',
        program: 'Engineering',
      };

      const result = new User();
      jest.spyOn(service, 'create').mockResolvedValue(result);

      expect(await controller.createStudent(dto)).toBe(result);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result = [new User(), new User()];
      jest.spyOn(service, 'findAll').mockResolvedValue(result);

      expect(await controller.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a user by id', async () => {
      const result = new User();
      jest.spyOn(service, 'findOne').mockResolvedValue(result);

      expect(await controller.findOne(1)).toBe(result);
    });
  });

  describe('updateStudent', () => {
    it('should update a student', async () => {
      const dto: UpdateStudentDto = {
        email: 'updated@student.com',
      };

      const result = new User();
      jest.spyOn(service, 'update').mockResolvedValue(result);

      expect(await controller.updateStudent(1, dto)).toBe(result);
    });
  });

  describe('updateRestaurant', () => {
    it('should update a restaurant', async () => {
      const dto: UpdateRestaurantDto = {
        email: 'updated@restaurant.com',
      };

      const result = new User();
      jest.spyOn(service, 'update').mockResolvedValue(result);

      expect(await controller.updateRestaurante(1, dto)).toBe(result);
    });
  });

  describe('remove', () => {
    it('should remove a user by id', async () => {
      const result = undefined;
      jest.spyOn(service, 'remove').mockResolvedValue(result);

      expect(await controller.remove(1)).toBe(result);
    });
  });

  describe('findByRole', () => {
    it('should return users by role', async () => {
      const result = [new User(), new User()];
      jest.spyOn(service, 'findByRole').mockResolvedValue(result);

      expect(await controller.findByRole(Role.STUDENT)).toBe(result);
    });
  });

  describe('updateBalance', () => {
    it('should update the balance of a user', async () => {
      const result = new User();
      jest.spyOn(service, 'updateBalance').mockResolvedValue(result);

      expect(await controller.updateBalance(1, 50)).toBe(result);
    });
  });
});
