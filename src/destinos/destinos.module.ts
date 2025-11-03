import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DestinosService } from './destinos.service';
import { DestinosController } from './destinos.controller';
import { Destino } from './entities/destino.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Destino])],
  controllers: [DestinosController],
  providers: [DestinosService],
  exports: [DestinosService],
})
export class DestinosModule {}
