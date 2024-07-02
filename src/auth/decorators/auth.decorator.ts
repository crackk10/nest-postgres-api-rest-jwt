import { UseGuards, applyDecorators } from "@nestjs/common";
import { Role } from "../../common/enums/rol.enum";
import { Roles } from "./roles.decorator";
import { AuthGuard } from "../guard/auth.guard";
import { RolesGuard } from "../guard/roles.guard";
//aqui se juntan varios decoradores y guard
export function Auth(role:Role[]){
  return applyDecorators(
    Roles(role),//primero Guarda el rol que permitirá el ingreso, viene desde la ruta
    UseGuards(AuthGuard, RolesGuard)//luego pregunta si está logeado y finalmente que rol tiene
  )
}