import { Injectable, BadRequestException, UnauthorizedException, } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { CreateRestaurantDto } from 'src/roles/dto/create-restaurant.dto';
import { CreateStudentDto } from 'src/roles/dto/create-student.dto';
import { CreateSupervisorDto } from 'src/roles/dto/create-supervisor.dto';
import { Role } from 'src/roles/enum/role.enum';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private jwtService : JwtService,
    ){}
    
    async register(registerDto: any) {
        const { email, password, ...rest } = registerDto;
        let createUserDto: any;

        try {
            // Encriptar la contraseña
            const hashedPassword = await bcryptjs.hash(password, 10);
            
            // Determinar el tipo de usuario basado en los campos presentes en el DTO
            if ('name' in rest && 'manager' in rest) {
                createUserDto = { email, password: hashedPassword, ...rest } as CreateRestaurantDto;
            } else if ('lastname' in rest && 'dni' in rest && 'code' in rest && 'program' in rest) {
                createUserDto = { email, password: hashedPassword, ...rest } as CreateStudentDto;
            } else if ('lastname' in rest && 'dni' in rest) {
                createUserDto = { email, password: hashedPassword, ...rest } as CreateSupervisorDto;
            } else {
                throw new BadRequestException('Unable to determine user type');
            }

            // Crear el usuario con la contraseña encriptada
            await this.usersService.create(createUserDto);
            

            return { email };
        } catch (error) {
            // Manejar cualquier error de encriptación o creación de usuario
            throw new BadRequestException('Error registering user: ' + error.message);
        }
    }

    
    async login({email, password}:LoginDto){
        const user = await this.usersService.findByEmailWithPassword(email);
        console.log(user);
        if(!user){
            throw new UnauthorizedException('Email or password is wrong')

        }

        const isPasswordValid = await bcryptjs.compare(password, user.password);

        if(!isPasswordValid){
            throw new UnauthorizedException('Email or password is wrong')
        }

        const payload = {email: user.email, role:user.role}; //
        const token = await this.jwtService.signAsync(payload)
        return {
            token,
            email,
            role: user.role
        }
    }

    async profile({email, role}: {email:string; role:string;}) {

        if (role) 
            
        return await this.usersService.findOneByEmail(email);
    }
}
