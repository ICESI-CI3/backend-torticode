import { CreateUserDto } from '../../users/dto/create-user.dto';
import { IsNotEmpty, IsString, MinLength, MaxLength, IsNumber } from 'class-validator';

export class CreateSupervisorDto extends CreateUserDto{
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

}