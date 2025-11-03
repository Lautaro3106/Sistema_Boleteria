import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, Patch } from '@nestjs/common';
import { ColectivosService } from './colectivos.service';
import { Colectivo } from './entities/colectivo.entity';

@Controller('colectivos')
export class ColectivosController {
  constructor(private readonly colectivosService: ColectivosService) {}

  // 📥 Crear un nuevo colectivo
  @Post()
  async create(@Body() data: Partial<Colectivo>): Promise<Colectivo> {
    return this.colectivosService.create(data);
  }

  // 📋 Obtener todos los colectivos
  @Get()
  async findAll(): Promise<Colectivo[]> {
    return this.colectivosService.findAll();
  }

  // 🔍 Obtener un colectivo por ID
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Colectivo> {
    return this.colectivosService.findOne(id);
  }

  // 🔧 Actualizar un colectivo
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<Colectivo>,
  ): Promise<Colectivo> {
    return this.colectivosService.update(id, data);
  }

  // 🗑️ Eliminar un colectivo
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<{ mensaje: string }> {
    await this.colectivosService.remove(id);
    return { mensaje: 'Colectivo eliminado correctamente' };
  }
}
