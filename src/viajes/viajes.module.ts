import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ViajesService } from './viajes.service';
import { ViajesController } from './viajes.controller';
import { Viaje } from './entities/viaje.entity';
import { Colectivo } from '../colectivos/entities/colectivo.entity';
import { Destino } from '../destinos/entities/destino.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Viaje, Colectivo, Destino])],
  controllers: [ViajesController],
  providers: [ViajesService],
  exports: [TypeOrmModule], // 👈 por si otro módulo necesita Viaje más adelante
})
export class ViajesModule {}
