import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guard/auth.guard';
import { Request } from 'express';
import { Roles } from './decorators/roles.decorator';
import { RolesGuard } from './guard/roles.guard';
import { Role } from '../common/enums/rol.enum';
import { Auth } from './decorators/auth.decorator';
import { ActiveUser } from '../common/decorators/activate-user-decorator';
import { UserActiveInterface } from 'src/common/interfaces/user-active.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  register (
    @Body()
    registerDto : RegisterDto
  ){
    return this.authService.register(registerDto)
  }
  @Post('login')
  login (
    @Body()
    loginDto: LoginDto, 
  ){
    return this.authService.login(loginDto)
  }

/*   @Get('profile')
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)//usa un guard que brinda seguridad a la ruta, permitiendo hacer validaciones de usaurio
  // ejemp : es admin? está logueado? etc, etc
  profile(@Req () req : RequestWithUser){
    
    return this.authService.profile(req.user)
  } */


  @Get('profile')
  @Auth([Role.USER])//este decorador juntó el decorador Roles y los guard roles y auth
  profile(@ActiveUser() user : UserActiveInterface){//el decorador ActiveUser se creo para verificar que venga usuario y rol en la solicitud
    return this.authService.profile(user)
  }
}
