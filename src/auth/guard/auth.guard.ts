import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { jwtConstants } from '../constants/jwt.constants';

@Injectable()
//esto se ejecuta antes de acceder a cada ruta, aqui se hacen validaciones como roles, etc..
// si es true, ingresa, sino... lo regresa
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService : JwtService){}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // El objeto context proporciona información sobre la solicitud entrante y el entorno de ejecución.
    const request = context.switchToHttp().getRequest();
    console.log(request.headers.authorization);
 
    
    const token = this.extractTokenFromHeader(request) //invaca la funcion para extraer el token
    if (!token) { // para esta validación, si la solicitud trae un token, deja continuar a la siguiente
      throw new UnauthorizedException()// sino  lanza uan exception
    }
    
    try {// luego, si trae el token, ingresa a esta validación 
      const payload = await this.jwtService.verifyAsync(token, {// verifica que el token sea valido
        secret: jwtConstants.secret, //el token debe traer la misma palabra secreta que se configuró en el auth.module.ts
      });
      request.user = payload;//esta propiedad se enviar al controlador por medio del @Request 
    } catch (error) {
      throw new UnauthorizedException();
    }
    return true; 
  }

  private extractTokenFromHeader(request: Request) {
    // si el request trae headers con autorizaation
    // corta la cadena, los separa en tipo y el token
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined; //si es tipo bearer retorna el token, sino retorna undefined
  }
}
''