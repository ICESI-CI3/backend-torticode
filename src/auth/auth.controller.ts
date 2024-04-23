import { Controller , Post, Body, Get, UseGuards, Req} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Role } from 'src/roles/enum/role.enum';
//import { Auth } from './decorators/auth.decorator';
import { AuthGuard } from './guard/auth.guard';
import {Request} from 'express'; 
import {Roles} from './decorators/roles.decorators';
import { RolesGuard } from './guard/roles.guard';
import { Auth } from './decorators/auth.decorators';

interface RequestWithUser extends Request{
  user: {
    email: string; 
    role: string 
  }

}

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ){}

    @Post('login')
    login(
      @Body()
      loginDto: LoginDto,
    ){
        return this.authService.login(loginDto);
    }

    @Post('register')
    register(
    @Body()
    registerDto: any,
  ) {
    return this.authService.register(registerDto);
  }


  @Get('profile')
  @Auth(Role.SUPERVISOR)
  @UseGuards(AuthGuard, RolesGuard)
  profile(
    @Req()
    req : RequestWithUser,
  ) {
    return  this.authService.profile(req.user)
}


}