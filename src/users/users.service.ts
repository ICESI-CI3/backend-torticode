import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [
    {
      id: '1',
      email: 'johndoe@gmail.com',
      password: 'admin123',
      balance: 0,

    },
    {
      id: '2',
      email: 'dianalorena@gmail.com',
      password: 'diana123',
      balance: 0, 
    }
    
  ];
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(userId: string): Promise<User | undefined> {
    return this.users.find(user => user.id == userId);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
