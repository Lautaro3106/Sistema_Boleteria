import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  Query,
  Put,
} from '@nestjs/common';
import { PasajesService } from './pasajes.service';
import { CreatePasajeDto } from './dto/create-pasaje.dto';
import { UpdateEstadoPasajeDto } from './dto/update-estado-pasaje.dto';
import { Pasaje } from './entities/pasaje.entity';

@Controller('pasajes')
export class PasajesController {
  constructor(private readonly pasajesService: PasajesService) {}

  // Crear un nuevo pasaje (venta o reserva)
  @Post()
  async crearPasaje(@Body() dto: CreatePasajeDto): Promise<Pasaje> {
    console.log('📩 Body recibido en controller:', dto);
    return this.pasajesService.crearPasaje(dto);
  }

  // Obtener todos los pasajes o filtrarlos por viaje
  // Ejemplo: GET /pasajes?viajeId=1
  @Get()
  async obtenerTodos(
    @Query('viajeId') viajeId?: string,
  ): Promise<Pasaje[]> {
    if (viajeId) {
      const id = parseInt(viajeId, 10);
      return this.pasajesService.obtenerTodos(id);
    }
    return this.pasajesService.obtenerTodos();
  }

  // Eliminar un pasaje por ID
  @Delete(':id')
  async eliminar(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ mensaje: string }> {
    await this.pasajesService.eliminarPasaje(id);
    return { mensaje: 'Pasaje eliminado correctamente.' };
  }

  // Actualizar el estado de un pasaje
  // Ejemplo: PUT /pasajes/10/estado  { "estado": "cancelado" }
  @Put(':id/estado')
  async actualizarEstado(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateEstadoPasajeDto,
  ): Promise<{ mensaje: string; pasaje: Pasaje }> {
    const pasajeActualizado = await this.pasajesService.actualizarEstado(
      id,
      dto.estado,
    );
    return {
      mensaje: `Estado del pasaje actualizado a '${dto.estado}' correctamente.`,
      pasaje: pasajeActualizado,
    };
  }
}
