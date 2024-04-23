import { Transform } from "class-transformer";
import { MinLength,Matches,MaxLength,IsEmail, IsString } from "class-validator";

export class CreateUserDto {    
    @IsEmail()
    readonly email: string;

    @Transform(({ value }) => value.trim()) //Vacios
    @IsString({message: 'The password must be a string'})
    @MinLength(6)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'The password must have a Uppercase, lowercase letter and a number'
    })
    password: string;

}
