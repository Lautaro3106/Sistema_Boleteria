import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { ViajesService } from './viajes.service';
import { CreateViajeDto } from './dto/create-viaje.dto';
import { UpdateViajeDto } from './dto/update-viaje.dto';
import { Viaje } from './entities/viaje.entity';

@Controller('viajes')
export class ViajesController {
  constructor(private readonly viajesService: ViajesService) {}

  // 📥 Crear un nuevo viaje
  @Post()
  create(@Body() createViajeDto: CreateViajeDto): Promise<Viaje> {
    return this.viajesService.create(createViajeDto);
  }

  // 📤 Obtener todos los viajes
  @Get()
  findAll(): Promise<Viaje[]> {
    return this.viajesService.findAll();
  }

  // 🔍 Obtener un viaje por su ID
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Viaje> {
    return this.viajesService.findOne(id);
  }

  // 🔍 Buscar viajes por origen y destino
  @Get('origen/:idOrigen/destino/:idDestino')
  async findByOrigenDestino(
    @Param('idOrigen', ParseIntPipe) idOrigen: number,
    @Param('idDestino', ParseIntPipe) idDestino: number,
  ) {
    const viajes = await this.viajesService.findByOrigenDestino(idOrigen, idDestino);
    if (!viajes.length) throw new NotFoundException('No hay viajes entre esos destinos.');
    return viajes;
  }

  // 📅 Buscar viajes por fecha
  @Get('fecha/:fecha')
  async findByFecha(@Param('fecha') fecha: string) {
    const viajes = await this.viajesService.findByFecha(fecha);
    if (!viajes.length) throw new NotFoundException('No hay viajes en esa fecha.');
    return viajes;
  }

  // 🔎 Buscar por origen, destino y fecha usando query params
  // Ejemplo: GET /viajes/buscar?origen=1&destino=2&fecha=2025-11-10
 @Get('buscar')
async buscarViajes(
  @Query('origen') origen: string,
  @Query('destino') destino: string,
  @Query('fecha') fecha: string,
) {
  console.log('🟢 Parámetros recibidos:', { origen, destino, fecha });

  if (!origen || !destino || !fecha) {
    throw new NotFoundException('Debe especificar origen, destino y fecha en la búsqueda.');
  }

  const origenNum = parseInt(origen, 10);
  const destinoNum = parseInt(destino, 10);

  if (isNaN(origenNum) || isNaN(destinoNum)) {
    throw new NotFoundException('Origen y destino deben ser valores numéricos válidos.');
  }

  const viajes = await this.viajesService.buscarViajes(origenNum, destinoNum, fecha);

  if (!viajes.length) {
    throw new NotFoundException('No hay viajes disponibles para esa ruta y fecha.');
  }

  return viajes;
}



  // 🔧 Actualizar un viaje existente
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateViajeDto: UpdateViajeDto,
  ): Promise<Viaje> {
    return this.viajesService.update(id, updateViajeDto);
  }

  // 🗑️ Eliminar un viaje
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.viajesService.remove(id);
  }
}

