import { Module } from '@nestjs/common';
import { BreedsService } from './breeds.service';
import { BreedsController } from './breeds.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Breed } from './entities/breed.entity';

@Module({
  imports : [TypeOrmModule.forFeature([Breed])],//necesario para interactuar con la BD
  controllers: [BreedsController],
  providers: [BreedsService],
  exports : [TypeOrmModule] //necesario para que el modulo cats acceda a el
})
export class BreedsModule {}
