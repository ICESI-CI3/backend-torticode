import { CreateUserDto } from '../../users/dto/create-user.dto';
import { IsNotEmpty, IsString, MinLength, MaxLength, IsNumber } from 'class-validator';

export class CreateSupervisorDto extends CreateUserDto{
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

}