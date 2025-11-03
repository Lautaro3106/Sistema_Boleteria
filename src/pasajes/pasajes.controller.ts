import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { PasajesService } from './pasajes.service';
import { CreatePasajeDto } from './dto/create-pasaje.dto';
import { Pasaje } from './entities/pasaje.entity';
import { Put } from '@nestjs/common';
import { UpdateEstadoPasajeDto } from './dto/update-estado-pasaje.dto';


@Controller('pasajes')
export class PasajesController {
  constructor(private readonly pasajesService: PasajesService) {}

  // Crear nuevo pasaje (venta o reserva)
 @Post()
async crearPasaje(@Body() dto: CreatePasajeDto): Promise<Pasaje> {
  console.log('📩 Body recibido en controller:', dto);
  return this.pasajesService.crearPasaje(dto);
}


  // Obtener todos los pasajes
  @Get()
  async obtenerTodos(): Promise<Pasaje[]> {
    return this.pasajesService.obtenerTodos();
  }

  // Eliminar un pasaje por ID
  @Delete(':id')
  async eliminar(@Param('id', ParseIntPipe) id: number): Promise<{ mensaje: string }> {
    await this.pasajesService.eliminarPasaje(id);
    return { mensaje: 'Pasaje eliminado correctamente' };
  }

  // Actualizar el estado de un pasaje
@Put(':id/estado')
async actualizarEstado(
  @Param('id', ParseIntPipe) id: number,
  @Body() dto: UpdateEstadoPasajeDto,
): Promise<{ mensaje: string; pasaje: any }> {
  const pasajeActualizado = await this.pasajesService.actualizarEstado(id, dto.estado);
  return {
    mensaje: `Estado del pasaje actualizado a '${dto.estado}' correctamente`,
    pasaje: pasajeActualizado,
  };
}

}

