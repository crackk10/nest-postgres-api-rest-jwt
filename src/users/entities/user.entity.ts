
import { Role } from '../../common/enums/rol.enum';
import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column({unique: true, nullable : false})
  email: string;
  @Column({ nullable : false, select : false})//no puede ser nula y cuando se consulta, no la devuelve
  password: string;
  @Column({type: 'enum', default: Role.USER, enum : Role})//define por default lo guardado en Role.USER
  role: Role
  @DeleteDateColumn()
  deleteAT: Date;
}
