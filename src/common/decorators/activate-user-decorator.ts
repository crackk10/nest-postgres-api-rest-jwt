import { ExecutionContext, createParamDecorator } from "@nestjs/common";

/* este es el decorador que contiene el payload que se creo en el auth.Guard,
este es quien recibe el parametro de usuario (tipo y correo) */

export const ActiveUser = createParamDecorator(
  (data : unknown, ctx: ExecutionContext)=>{
    const request = ctx.switchToHttp().getRequest() //esta linea accede al request
    return request.user //con este decorador acceder al user, se agregó esta propiedad en el auth.guard
  })