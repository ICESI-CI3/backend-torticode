import { Injectable } from '@nestjs/common';
import { CreateRestaurantDto } from 'src/roles/dto/create-restaurant.dto';
import{ CreateStudentDto } from 'src/roles/dto/create-student.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Restaurant } from 'src/roles/entities/restaurant.entity';
import { Student } from 'src/roles/entities/student.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from 'src/roles/enum/role.enum';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) 
    private userRepository: Repository<User>,
    @InjectRepository(Restaurant)
    private restaurantRepository: Repository<Restaurant>,
    @InjectRepository(Student)
    private studentRepository: Repository<Student>
  ) {}

  
  async create(createUserDto: CreateUserDto | CreateRestaurantDto | CreateStudentDto): Promise<User> {
    if (createUserDto instanceof CreateRestaurantDto) {
      const restaurant = this.restaurantRepository.create(createUserDto);
      restaurant.role = Role.RESTAURANT; 
      return await this.restaurantRepository.save(restaurant);
    } else if (createUserDto instanceof CreateStudentDto) {
      const student = this.studentRepository.create(createUserDto);
      student.role = Role.STUDENT; 
      return await this.studentRepository.save(student);
    } else {
      console.log("entro");
      const user = this.userRepository.create(createUserDto);
      user.role = Role.ADMIN; 
      console.log(user);
      return await this.userRepository.save(user);
    }
  }
  
  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id:number){
    return await this.userRepository.find();
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update(id,updateUserDto);
  }

  async remove(id: number) {
    return await this.userRepository.softDelete(id);
  }
}
