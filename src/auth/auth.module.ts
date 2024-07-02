import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants/jwt.constants';

@Module({
  //se importa usersModule para utilizar el userService que se exporta desde ese modulo

  imports:[UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret, //se agrega una palabra secreta al token
      signOptions : { expiresIn : '1d'}
    })
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
