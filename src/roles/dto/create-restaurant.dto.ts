import { CreateUserDto } from '../../users/dto/create-user.dto';
import { IsNotEmpty, IsString, IsNumber, MinLength, MaxLength, IsPhoneNumber, Equals, Length } from 'class-validator';
import { Equal } from 'typeorm';

export class CreateRestaurantDto extends CreateUserDto{

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  name: string;

  @IsNotEmpty()
  @IsNumber()
  nit: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  manager: string;

  @IsNotEmpty()
  @IsString()
  phone: string;
}
