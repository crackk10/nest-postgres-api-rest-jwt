import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cat } from './entities/cat.entity';
import { Repository } from 'typeorm';
import { Breed } from 'src/breeds/entities/breed.entity';
import { UserActiveInterface } from 'src/common/interfaces/user-active.interface';
import { Role } from 'src/common/enums/rol.enum';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat)
    private readonly catRepository: Repository<Cat>,

    @InjectRepository(Breed)
    private readonly breedRepository: Repository<Breed>,
  ) {}
  async create(createCatDto: CreateCatDto, user: UserActiveInterface) {
    const breed = await this.validateBreed(createCatDto.breed)//se valida que exista la raza 
    // const  newCat = this.catRepository.create(createCatDto);
    return await this.catRepository.save({
      ...createCatDto,
      breed,
      userEmail: user.email,
    });
  }

  async findAll(user: UserActiveInterface) {
     if (user.role === Role.ADMIN) {
      return await this.catRepository.find();
    }
    return await this.catRepository.find({
      where: { userEmail: user.email }, //se filtró para que busque todos los cat que creó este usuario
    });
  }

  async findOne(id: number, user: UserActiveInterface) {
    const cat = await this.catRepository.findOneBy({ id });
    if (!cat) {
      throw new BadRequestException('Cat not found!');//si no hay gato con ese id
    }
    this.validateOwnership(cat,user)
    return cat
  }

  async update(id: number, updateCatDto: UpdateCatDto, user:UserActiveInterface) {
    //return await  this.catRepository.updateById(id, updateCatDto);
    await this.findOne( id, user );//ya están las validaciones, por eso se invoca este metodo

    return await this.catRepository.update(id,{
      ...updateCatDto,
      breed : updateCatDto.breed ? await this.validateBreed( updateCatDto.breed ) : undefined, //si no se cambia la raza, se mantiene la misma
      userEmail: user.email
    });
  }

  async remove(id: number, user:UserActiveInterface) {
    await this.findOne( id, user );
    return await this.catRepository.softDelete({ id }); //se pasa el id y oculta el dato y actualiza el campo  deleted_at en la tabla de bd
    //return await this.catRepository.softRemove({id}) //se pasa la instancia y elimina el dato de la db
  }

  private validateOwnership(cat : Cat, user : UserActiveInterface) {
    if (user.role !== Role.ADMIN && cat.userEmail !== user.email) {
      throw new UnauthorizedException()//si no es admin y no creo el cat, envia una exception 
    }
  }

  private async validateBreed(breed:string){
    const breedEntity = await this.breedRepository.findOneBy({name: breed,});//consulta en la tabla breed por el nombre
    if (!breedEntity) {
      throw new BadRequestException('Breed not found!');//si no existe envia una exception
    }
    return breedEntity //si existe la retorna
  }
}

