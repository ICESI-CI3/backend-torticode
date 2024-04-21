import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { IsNotEmpty, IsString, IsNumber, MinLength, MaxLength, IsPhoneNumber } from 'class-validator';

export class CreateRestaurantDto extends CreateUserDto{
    
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @MinLength(10)
  @MaxLength(10)
  nit: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  manager: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;

  @IsNotEmpty()
  @IsNumber()
  balance: number;

  // Si necesitas capturar los roles en el DTO, asegúrate de añadir validación para solo permitir "restaurant"
  role: string = 'restaurant';

  // Agrega otros campos relevantes de User si es necesario.
}
