import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColectivosService } from './colectivos.service';
import { ColectivosController } from './colectivos.controller';
import { Colectivo } from './entities/colectivo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Colectivo])], // ESTA LÍNEA ES CLAVE
  controllers: [ColectivosController],
  providers: [ColectivosService],
  exports: [ColectivosService],
})
export class ColectivosModule {}
