import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateRestaurantDto } from '../roles/dto/create-restaurant.dto';
import { CreateStudentDto } from '../roles/dto/create-student.dto'; 
import { CreateSupervisorDto } from '../roles/dto/create-supervisor.dto';
import { UpdateStudentDto } from '../roles/dto/update-student.dto';
import { UpdateRestaurantDto } from '../roles/dto/update-restaurant.dto';
import { UpdateSupervisorDto } from '../roles/dto/update-supervisor.dto';
import { Role } from '../roles/enum/role.enum';
import { User } from './entities/user.entity';
import { Auth } from '../auth/decorators/auth.decorators';


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

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.usersService.remove(id);
  }

  @Get('/by-role/:role')
  async findByRole(@Param('role') role: Role): Promise<User[]> {
    return await this.usersService.findByRole(role);
  }

  @Patch('balance/:id')
  updateBalance(@Param('id') id: number, @Body('amount') amount: number) {
    return this.usersService.updateBalance(id, amount);
  }
  
}
