import { IsEmail, IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    readonly name: string;
    @IsEmail()
    readonly email: string;

    readonly password: string;
}
