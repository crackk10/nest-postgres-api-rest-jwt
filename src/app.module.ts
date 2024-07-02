import { Module, Sse } from '@nestjs/common';

import { CatsModule } from './cats/cats.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BreedsModule } from './breeds/breeds.module';
import { UsersModule } from './users/users.module';

import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';// variables de entonrno, SE INSTALA CON yarn add @nestjs/config
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),// variables de entonrno
    TypeOrmModule.forRoot(
      {
        type : 'postgres',
        host : process.env.POSRGRES_HOTS,
        port :  parseInt(process.env.POSTGRES_PORT),
        username : process.env.POSTGRES_USERNAME,
        password : process.env.POSTGRES_PASSWORD,
        database : process.env.POSTGRES_DATABASE,
        autoLoadEntities : true,
        synchronize : true, //Necesario para que se creen las tablas en la BD si no existen
        ssl : process.env.POSTGRES_SSL === 'true', //solo en producción
        extra : { //solo en producción
          ssl : process.env.POSTGRES_SSL === 'true' 
          ?{
            rejectUnauthorized : false
          }:null
          
        }
      }
    ),
    CatsModule,
    BreedsModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
