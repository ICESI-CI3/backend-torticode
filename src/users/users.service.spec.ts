import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { Restaurant } from '../roles/entities/restaurant.entity';
import { Student } from '../roles/entities/student.entity';
import { Supervisor } from '../roles/entities/supervisor.entity';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { Role } from '../roles/enum/role.enum';
import { NotFoundException } from '@nestjs/common/exceptions';

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: Repository<User>;
  let restaurantRepository: Repository<Restaurant>;
  let studentRepository: Repository<Student>;
  let supervisorRepository: Repository<Supervisor>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forFeature([User, Restaurant, Student, Supervisor]),
      ],
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Restaurant),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Student),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Supervisor),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    restaurantRepository = module.get<Repository<Restaurant>>(getRepositoryToken(Restaurant));
    studentRepository = module.get<Repository<Student>>(getRepositoryToken(Student));
    supervisorRepository = module.get<Repository<Supervisor>>(getRepositoryToken(Supervisor));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a restaurant', async () => {
      const createRestaurantDto = {
        email: 'restaurant@example.com',
        password: 'Password123',
        name: 'Test Restaurant',
        nit: 123456789,
        manager: 'John Doe',
        phone: '1234567890',
      };

      jest.spyOn(restaurantRepository, 'save').mockResolvedValue(createRestaurantDto as Restaurant);

      const result = await service.create(createRestaurantDto);
      expect(result).toEqual(createRestaurantDto);
      expect(result.role).toEqual(Role.RESTAURANT);
    });

    it('should create a student', async () => {
      const createStudentDto = {
        email: 'student@example.com',
        password: 'Password123',
        name: 'Test Student',
        lastname: 'Doe',
        dni: 123456789,
        code: '123456789',
        program: 'Computer Science',
      };

      jest.spyOn(studentRepository, 'save').mockResolvedValue(createStudentDto as Student);

      const result = await service.create(createStudentDto);
      expect(result).toEqual(createStudentDto);
      expect(result.role).toEqual(Role.STUDENT);
    });

    it('should create a supervisor', async () => {
      const createSupervisorDto = {
        email: 'supervisor@example.com',
        password: 'Password123',
        name: 'Test Supervisor',
        lastname: 'Doe',
        dni: 123456789,
      };

      jest.spyOn(supervisorRepository, 'save').mockResolvedValue(createSupervisorDto as Supervisor);

      const result = await service.create(createSupervisorDto);
      expect(result).toEqual(createSupervisorDto);
      expect(result.role).toEqual(Role.SUPERVISOR);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result = [new Restaurant(), new Student(), new Supervisor()];
      jest.spyOn(userRepository, 'find').mockResolvedValue(result);

      expect(await service.findAll()).toEqual(result);
    });
  });

  describe('findOne', () => {
    it('should return a user', async () => {
      const user = new Restaurant();
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);

      expect(await service.findOne(1)).toEqual(user);
    });

    it('should throw an error if user not found', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const updateUserDto = { email: 'updated@example.com' };
      const user = new Restaurant();
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);
      jest.spyOn(userRepository, 'update').mockResolvedValue({ affected: 1 } as UpdateResult);

      await service.update(1, updateUserDto);

      expect(userRepository.update).toHaveBeenCalledWith(1, updateUserDto);
      expect(userRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('should throw an error if user not found', async () => {
      const updateUserDto = { email: 'updated@example.com' };
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);

      await expect(service.update(1, updateUserDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      jest.spyOn(userRepository, 'softDelete').mockResolvedValue({ affected: 1 } as UpdateResult);

      await expect(service.remove(1)).resolves.toBeUndefined();
    });

    it('should throw an error if user not found', async () => {
      jest.spyOn(userRepository, 'softDelete').mockResolvedValue({ affected: 0 } as UpdateResult);

      await expect(service.remove(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('updateBalance', () => {
    it('should update the balance of a user', async () => {
      const user = new Restaurant();
      user.balance = 100;
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);
      jest.spyOn(userRepository, 'save').mockResolvedValue(user);

      const result = await service.updateBalance(1, 50);
      expect(result.balance).toEqual(150);
    });

    it('should throw an error if user not found', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);

      await expect(service.updateBalance(1, 50)).rejects.toThrow(NotFoundException);
    });
  });

  describe('updateRole', () => {
    it('should update the role of a user', async () => {
      const user = new Restaurant();
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);
      jest.spyOn(userRepository, 'save').mockResolvedValue(user);

      const result = await service.updateRole(1, Role.SUPERVISOR);
      expect(result.role).toEqual(Role.SUPERVISOR);
    });

    it('should throw an error if user not found', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);

      await expect(service.updateRole(1, Role.SUPERVISOR)).rejects.toThrow(NotFoundException);
    });
  });
});
