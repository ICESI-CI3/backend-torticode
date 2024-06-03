import { CreateUserDto } from '../../users/dto/create-user.dto';
import { IsNotEmpty, IsString, MinLength, MaxLength, IsAlphanumeric, IsNumber } from 'class-validator';

export class CreateStudentDto extends CreateUserDto{
  @IsNotEmpty({message: 'the name is required'})
  @IsString({message: 'the name must be a string'})
  @MinLength(3)
  @MaxLength(50)
  name: string;

  @IsNotEmpty({message: 'the lastname is required'})
  @IsString({message: 'the lastname must be a string'})
  @MinLength(3)
  @MaxLength(50)
  lastname: string;

  @IsNotEmpty({message: 'the dni is required'})
  @IsNumber()
  dni: number;

  @IsNotEmpty({message: 'the code is required'})
  @IsAlphanumeric()
  @MinLength(9)
  @MaxLength(9)
  code: string;

  @IsNotEmpty({message: 'the program is required'})
  @IsString({message: 'the program must be a string'})
  @MinLength(2)
  @MaxLength(100)
  program: string;

}
