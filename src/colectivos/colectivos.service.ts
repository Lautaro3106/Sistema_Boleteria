import { Injectable } from '@nestjs/common';
import { CreateColectivoDto } from './dto/create-colectivo.dto';
import { UpdateColectivoDto } from './dto/update-colectivo.dto';

@Injectable()
export class ColectivosService {
  create(createColectivoDto: CreateColectivoDto) {
    return 'This action adds a new colectivo';
  }

  findAll() {
    return `This action returns all colectivos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} colectivo`;
  }

  update(id: number, updateColectivoDto: UpdateColectivoDto) {
    return `This action updates a #${id} colectivo`;
  }

  remove(id: number) {
    return `This action removes a #${id} colectivo`;
  }
}
