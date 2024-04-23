import { Controller , Post, Body, Get, UseGuards, Request} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
//import { Role } from '../common/enums/rol.enum';
//import { Auth } from './decorators/auth.decorator';
import { AuthGuard } from './guard/auth.guard';

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
  @UseGuards(AuthGuard)
  profile(
    @Request()
    req,
  ) {
    return  req.user;
}


}