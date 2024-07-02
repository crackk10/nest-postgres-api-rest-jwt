import { SetMetadata } from '@nestjs/common';
import { Role } from '@src/common/enums/rol.enum';


//Aqui se crea una metadata que funciona como un localStorage y se guarda la informacoón que recibe como parametro

export const ROLES_KEY = 'roles';
//export const roles = (parametroQueRecibe) => SetMetadata('key', parametroQueRecibe)
export const Roles = (role : Role[]) => SetMetadata(ROLES_KEY, role);

//entonces se creó una metadata roles = Role[](el cual puede ser una de las opciones del enum que se importó),
//esta se recibe por parametro