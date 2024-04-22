import { Controller , Post, Body, Get} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ){}

    @Post('login')
    login(){
        return this.authService.login();
    }

    @Post('register')
    register(
    @Body()
    registerDto: any,
  ) {
    return this.authService.register(registerDto);
  }
}
