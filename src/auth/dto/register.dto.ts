import { Transform } from 'class-transformer';
import { IsEmail, IsString, MinLength, Matches } from 'class-validator';

export class RegisterDto {

  @IsEmail()
  email: string;

  @Transform(({ value }) => value.trim()) //Vacios
  @IsString({message: 'The password must have a number, uppercase and lowercase letters.'})
  @MinLength(6)
  @Matches(
      /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
      message: 'The password must have a Uppercase, lowercase letter and a number'
  })
  password: string;
}