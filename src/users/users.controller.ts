import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateRestaurantDto } from 'src/roles/dto/create-restaurant.dto';
import { CreateStudentDto } from 'src/roles/dto/create-student.dto'; 
import { CreateSupervisorDto } from 'src/roles/dto/create-supervisor.dto';

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

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.usersService.remove(id);
  }
}
