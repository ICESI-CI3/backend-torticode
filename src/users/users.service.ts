import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRestaurantDto } from 'src/roles/dto/create-restaurant.dto';
import{ CreateStudentDto } from 'src/roles/dto/create-student.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Restaurant } from 'src/roles/entities/restaurant.entity';
import { Student } from 'src/roles/entities/student.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Role } from 'src/roles/enum/role.enum';
import { UpdateStudentDto } from 'src/roles/dto/update-student.dto';
import { UpdateRestaurantDto } from 'src/roles/dto/update-restaurant.dto';
import { CreateSupervisorDto } from 'src/roles/dto/create-supervisor.dto';
import { Supervisor } from 'src/roles/entities/supervisor.entity';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) 
    private userRepository: Repository<User>,
    @InjectRepository(Restaurant)
    private restaurantRepository: Repository<Restaurant>,
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
    @InjectRepository(Supervisor)
    private supervisorRepository: Repository<Supervisor>
  ) {}

  
  async create(createUserDto: CreateSupervisorDto | CreateRestaurantDto | CreateStudentDto): Promise<User> {
    const { email, password, ...rest } = createUserDto;
    
    if ('name' in rest && 'manager' in rest) {
      const restaurant = this.restaurantRepository.create(createUserDto);
      restaurant.role = Role.RESTAURANT; 
      return await this.restaurantRepository.save(restaurant);
    }  else if ('lastname' in rest && 'dni' in rest && 'code' in rest && 'program' in rest) {
      const student = this.studentRepository.create(createUserDto);
      student.role = Role.STUDENT; 
      return await this.studentRepository.save(student);
    }  else if ('lastname' in rest && 'dni' in rest) {
      const supervisor = this.supervisorRepository.create(createUserDto);
      supervisor.role = Role.SUPERVISOR; 
      return await this.supervisorRepository.save(supervisor);
    } else {
      throw new BadRequestException('The provided data does not match any known user type');
    }
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id:number){
    return await this.userRepository.find();
  }

  async update(id: number, updateUserDto: UpdateUserDto | UpdateStudentDto | UpdateRestaurantDto) {
    
    return await this.userRepository.update(id,updateUserDto);
  }

  async remove(id: number) {
    return await this.userRepository.softDelete(id);
  }

  async findByRole(role: Role): Promise<User[]> {
    return await this.userRepository.find({ where: { role } });
  }

  findOneByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }

  findByEmailWithPassword(email: string) {
    return this.userRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password', 'role'],
    });
  }
}