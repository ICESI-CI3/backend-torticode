import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) 
    private userRepository: Repository<User>
  ) {}

  
  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
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
