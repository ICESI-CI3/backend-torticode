import { CreateUserDto } from '../../users/dto/create-user.dto';
import { IsNotEmpty, IsString, MinLength, MaxLength, IsAlphanumeric, IsNumber } from 'class-validator';

export class CreateStudentDto extends CreateUserDto{
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  lastname: string;

  @IsNotEmpty()
  @IsNumber()
  dni: number;

  @IsNotEmpty()
  @IsAlphanumeric()
  @MinLength(9)
  @MaxLength(9)
  code: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  program: string;

}
