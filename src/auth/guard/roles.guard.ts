import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator'; //se importan las key de la metadata roles
import { Role } from '@src/common/enums/rol.enum';




@Injectable()
export class RolesGuard implements CanActivate {
  constructor (private readonly reflector : Reflector){}
  canActivate( context: ExecutionContext,): boolean {
   
    const roles = this.reflector.getAllAndOverride(ROLES_KEY, [  //accede a la metadata por medio de la key 
      context.getHandler(), //trae el valor de metadatos que se envio como parametro desde el controlador
      context.getClass(),
    ])

    if (!roles) {//si no se envió parametro deja pasar
      return true
    }

    const {user} = context.switchToHttp().getRequest() //desestructura el auth de la peticón el cual trae email, role...
    console.log(roles);
    //validacion de que el admin puede hacer de todo
    if(user.role == Role.ADMIN){
      return true
    }
    //return roles === user.role // si se invoca el docorador en el controller con un string y no con un array   
    // si se usa un array verificamos si alguno de los roles del usuario coincide con uno de los permitidos
    //desde el controlador @Role(['admin','user'])
    return roles.some((role) => user.role?.includes(role)) 
    
    
  }
}
