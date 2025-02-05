import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';

import * as bcryptjs from 'bcryptjs'; //paquete para encriptar el password
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}

  async register({ name, email, password }: RegisterDto) {
    const user = await this.usersService.findOneByEmail(email);
    if (user){
      throw new BadRequestException('Ya hay un usuario registrado con este Email',)
    }
    return await this.usersService.create({
      name,
      email,
      password: await bcryptjs.hash(password, 10),
    });
  }

  async login({ email, password }: LoginDto) {
    const user = await this.usersService.findOneByEmailWithPassword(email);
    if (!user){
      throw new UnauthorizedException('No exite usuario registrado con este Email',)
    }
    const isPasswordValid = await bcryptjs.compare(password, user.password)
    if (!isPasswordValid) {
      throw new UnauthorizedException('Contraseña incorrecta')
    }
    const payload = { email : user.email, role : user.role}
    const token = await this.jwtService.signAsync(payload)
    return {token, email};
  }

  async profile ({email, role}: {email: string; role:string}){
    if (role !== 'user') {
      throw new UnauthorizedException("No tienes autorización para ingresar a este recurso");
      
    }
    return await  this.usersService.findOneByEmail(email)
  }
}
