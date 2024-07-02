import { Cat } from "src/cats/entities/cat.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity()
export class Breed {
  @Column({primary: true, generated : true})
  id : number 
  @Column({length: 500})
  name : string
  // Relation with Cat entity
  @OneToMany(()=> Cat, (cat)=> cat.breed)//este no puede existir sin un ManyToOne en la otra tabla
  cats: Cat[]
}
