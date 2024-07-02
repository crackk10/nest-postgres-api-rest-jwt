import { Breed } from "../../breeds/entities/breed.entity"
import { User } from "../../users/entities/user.entity"
import { Column, DeleteDateColumn, Entity, JoinColumn,  ManyToOne } from "typeorm"
@Entity()
export class Cat {
  @Column( { type: 'int', primary: true, generated: true })
  id : number
  @Column()
  name: string
  @Column()
  age : number
  @DeleteDateColumn()
  deletedAt : Date
//relación con entidad breed(raza)
  @ManyToOne(()=> Breed,(breed)=> breed.id,{
    eager: true // cuando haga un findOne tambien trae la raza
  })
  breed: Breed
  //relacion con user, solo almacena el email y no la instancia
  @ManyToOne(()=> User)// el manyToOne es quien tiene la llave foranea, es decir, almacena la referencia a la otra tabla
  @JoinColumn({name: 'userEmail', referencedColumnName: 'email'})//con esta solo almacena un dato y no la isntan cia
  user:User
  
  @Column()//conlumna de relación con user en la que se guardará el email
  userEmail: string 
}
