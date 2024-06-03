import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Restaurant } from '../roles/entities/restaurant.entity';
import { Student } from '../roles/entities/student.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Restaurant, Student])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
