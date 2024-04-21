import { MinLength,Matches,MaxLength,IsEmail, IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    readonly name: string;
    
    @IsEmail()
    readonly email: string;


    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'The password must have a Uppercase, lowercase letter and a number'
    })
    password: string;
  

}
