import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateRestaurantDto } from 'src/roles/dto/create-restaurant.dto';
import { CreateStudentDto } from 'src/roles/dto/create-student.dto'; 
import { CreateSupervisorDto } from 'src/roles/dto/create-supervisor.dto';
import { UpdateStudentDto } from 'src/roles/dto/update-student.dto';
import { UpdateRestaurantDto } from 'src/roles/dto/update-restaurant.dto';
import { UpdateSupervisorDto } from 'src/roles/dto/update-supervisor.dto';
import { Role } from 'src/roles/enum/role.enum';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('restaurant')
  createRestaurant(@Body() createRestaurantDto: CreateRestaurantDto) {
    return this.usersService.create(createRestaurantDto);
  }
  
  @Post('student')
  createStudent(@Body() createStudentDto: CreateStudentDto) {
    return this.usersService.create(createStudentDto);
  }

  @Post('supervisor')
  createSupervisor(@Body() createSupervisorDto: CreateSupervisorDto) {
    return this.usersService.create(createSupervisorDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usersService.findOne(id);
  }

  @Patch('student/:id')
  updateStudent(@Param('id') id: number, @Body() updateUserDto: UpdateStudentDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Patch('restaurant/:id')
  updateRestaurante(@Param('id') id: number, @Body() updateUserDto: UpdateRestaurantDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Patch('supervisor/:id')
  updateSupervisor(@Param('id') id: number, @Body() updateUserDto: UpdateSupervisorDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.usersService.remove(id);
  }

  @Get('/by-role/:role')
  async findByRole(@Param('role') role: Role): Promise<User[]> {
    return await this.usersService.findByRole(role);
  }
}
