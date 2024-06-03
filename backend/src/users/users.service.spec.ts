import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { Restaurant } from '../roles/entities/restaurant.entity';
import { Student } from '../roles/entities/student.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { Role } from '../roles/enum/role.enum';
import { CreateStudentDto } from '../roles/dto/create-student.dto';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: Repository<User>;
  let restaurantRepository: Repository<Restaurant>;
  let studentRepository: Repository<Student>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    restaurantRepository = module.get<Repository<Restaurant>>(getRepositoryToken(Restaurant));
    studentRepository = module.get<Repository<Student>>(getRepositoryToken(Student));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const usersArray: User[] = [
        new User(),
        new User(),
      ];

      jest.spyOn(userRepository, 'find').mockResolvedValue(usersArray);

      expect(await service.findAll()).toBe(usersArray);
    });
  });

  describe('findOne', () => {
    it('should return a user if found', async () => {
      const user = new User();
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);

      expect(await service.findOne(1)).toBe(user);
    });

    it('should throw NotFoundException if user not found', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create and return a new student', async () => {
      const createStudentDto: CreateStudentDto = {
        email: 'test@student.com',
        password: 'Test1234',
        name: 'John',
        lastname: 'Doe',
        dni: 12345678,
        code: '20210001',
        program: 'Engineering',
      };

      const student = new Student();
      jest.spyOn(studentRepository, 'create').mockReturnValue(student);
      jest.spyOn(studentRepository, 'save').mockResolvedValue(student);

      expect(await service.create(createStudentDto)).toBe(student);
    });
  });

  describe('update', () => {
    it('should update and return the user', async () => {
      const updateUserDto: UpdateUserDto = {
        email: 'updated@student.com',
      };

      const user = new User();
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);
      jest.spyOn(userRepository, 'save').mockResolvedValue(user);
      jest.spyOn(userRepository, 'update').mockResolvedValue({ affected: 1 } as UpdateResult);
      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(user); // Mock findOne again to return updated user

      expect(await service.update(1, updateUserDto)).toBe(user);
    });

    it('should throw NotFoundException if user not found', async () => {
      const updateUserDto: UpdateUserDto = {
        email: 'updated@student.com',
      };

      jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);
      jest.spyOn(userRepository, 'update').mockResolvedValue({ affected: 0 } as UpdateResult);

      await expect(service.update(1, updateUserDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a user if found', async () => {
      const deleteResult = { affected: 1 } as any;
      jest.spyOn(userRepository, 'softDelete').mockResolvedValue(deleteResult);

      await service.remove(1);
      expect(userRepository.softDelete).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if user not found', async () => {
      const deleteResult = { affected: 0 } as any;
      jest.spyOn(userRepository, 'softDelete').mockResolvedValue(deleteResult);

      await expect(service.remove(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('updateBalance', () => {
    it('should update the user balance', async () => {
      const user = new User();
      user.balance = 100;
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);
      jest.spyOn(userRepository, 'save').mockResolvedValue(user);

      const amount = 50;
      expect(await service.updateBalance(1, amount)).toBe(user);
      expect(user.balance).toBe(150);
    });

    it('should throw NotFoundException if user not found', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);

      await expect(service.updateBalance(1, 50)).rejects.toThrow(NotFoundException);
    });
  });

  describe('updateRole', () => {
    it('should update the user role', async () => {
      const user = new User();
      user.role = Role.STUDENT;
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);
      jest.spyOn(userRepository, 'save').mockResolvedValue(user);

      const newRole = Role.RESTAURANT;
      expect(await service.updateRole(1, newRole)).toBe(user);
      expect(user.role).toBe(newRole);
    });

    it('should throw NotFoundException if user not found', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);

      await expect(service.updateRole(1, Role.RESTAURANT)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findByRole', () => {
    it('should return an array of users with the given role', async () => {
      const usersArray: User[] = [
        new User(),
        new User(),
      ];

      jest.spyOn(userRepository, 'find').mockResolvedValue(usersArray);

      expect(await service.findByRole(Role.STUDENT)).toBe(usersArray);
    });
  });

  describe('findOneByEmail', () => {
    it('should return a user if found by email', async () => {
      const user = new User();
      user.email = 'test@example.com';
      jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(user);

      expect(await service.findOneByEmail('test@example.com')).toBe(user);
    });

    it('should return null if user not found by email', async () => {
      jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(null);

      expect(await service.findOneByEmail('test@example.com')).toBeNull();
    });
  });

  describe('findByEmailWithPassword', () => {
    it('should return a user with password if found by email', async () => {
      const user = new User();
      user.email = 'test@example.com';
      user.password = 'hashedPassword';
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);

      expect(await service.findByEmailWithPassword('test@example.com')).toBe(user);
    });

    it('should return null if user not found by email with password', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);

      expect(await service.findByEmailWithPassword('test@example.com')).toBeNull();
    });
  });
});
