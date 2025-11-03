import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pasaje } from './entities/pasaje.entity';
import { PasajesService } from './pasajes.service';
import { PasajesController } from './pasajes.controller';
import { Viaje } from 'src/viajes/entities/viaje.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pasaje, Viaje])],
  controllers: [PasajesController],
  providers: [PasajesService],
})
export class PasajesModule {}
