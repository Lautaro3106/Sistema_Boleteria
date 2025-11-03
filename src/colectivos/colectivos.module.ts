import { Module } from '@nestjs/common';
import { ColectivosService } from './colectivos.service';
import { ColectivosController } from './colectivos.controller';

@Module({
  controllers: [ColectivosController],
  providers: [ColectivosService],
})
export class ColectivosModule {}
