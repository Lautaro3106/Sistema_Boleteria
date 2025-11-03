import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ColectivosService } from './colectivos.service';
import { CreateColectivoDto } from './dto/create-colectivo.dto';
import { UpdateColectivoDto } from './dto/update-colectivo.dto';

@Controller('colectivos')
export class ColectivosController {
  constructor(private readonly colectivosService: ColectivosService) {}

  @Post()
  create(@Body() createColectivoDto: CreateColectivoDto) {
    return this.colectivosService.create(createColectivoDto);
  }

  @Get()
  findAll() {
    return this.colectivosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.colectivosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateColectivoDto: UpdateColectivoDto) {
    return this.colectivosService.update(+id, updateColectivoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.colectivosService.remove(+id);
  }
}
