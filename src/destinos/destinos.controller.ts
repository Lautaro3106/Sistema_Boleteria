import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, Patch } from '@nestjs/common';
import { DestinosService } from './destinos.service';
import { Destino } from './entities/destino.entity';

@Controller('destinos')
export class DestinosController {
  constructor(private readonly destinosService: DestinosService) {}

  //  Crear un nuevo destino
  @Post()
  async create(@Body() data: Partial<Destino>): Promise<Destino> {
    return this.destinosService.create(data);
  }

  // Obtener todos los destinos
  @Get()
  async findAll(): Promise<Destino[]> {
    return this.destinosService.findAll();
  }

  //  Obtener un destino por ID
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Destino> {
    return this.destinosService.findOne(id);
  }

  //  Actualizar un destino
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<Destino>,
  ): Promise<Destino> {
    return this.destinosService.update(id, data);
  }

  //  Eliminar un destino
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<{ mensaje: string }> {
    await this.destinosService.remove(id);
    return { mensaje: 'Destino eliminado correctamente' };
  }
}
