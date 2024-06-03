import { CreateUserDto } from '../../users/dto/create-user.dto';
import { IsNotEmpty, IsString, IsNumber, MinLength, MaxLength, IsPhoneNumber, Equals, Length } from 'class-validator';
import { Equal } from 'typeorm';

export class CreateRestaurantDto extends CreateUserDto{

  @IsNotEmpty({message: 'the name is required'})
  @IsString({message: 'the name must be a string'})
  @MinLength(2)
  @MaxLength(100)
  name: string;

  @IsNotEmpty({message: 'the nit is required'})
  @IsNumber()
  nit: number;

  @IsNotEmpty({message: 'the address is required'})
  @IsString({message: 'the manager name must be a string'})
  @MinLength(2)
  @MaxLength(100)
  manager: string;

  @IsNotEmpty({message: 'the phone is required'})
  @IsString({message: 'the phone must be a string'})
  phone: string;
}
