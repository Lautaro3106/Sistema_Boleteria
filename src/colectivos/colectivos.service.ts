import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Colectivo } from './entities/colectivo.entity';

@Injectable()
export class ColectivosService {
  constructor(
    @InjectRepository(Colectivo)
    private readonly colectivoRepository: Repository<Colectivo>,
  ) {}

  //  Crear un nuevo colectivo
  async create(data: Partial<Colectivo>): Promise<Colectivo> {
    const nuevo = this.colectivoRepository.create(data);
    return this.colectivoRepository.save(nuevo);
  }

  //  Obtener todos los colectivos
  async findAll(): Promise<Colectivo[]> {
    return this.colectivoRepository.find();
  }

  //  Obtener un colectivo por ID
  async findOne(id: number): Promise<Colectivo> {
    const colectivo = await this.colectivoRepository.findOne({ where: { id } });
    if (!colectivo) throw new NotFoundException('Colectivo no encontrado');
    return colectivo;
  }

  //  Actualizar un colectivo
  async update(id: number, data: Partial<Colectivo>): Promise<Colectivo> {
    const colectivo = await this.findOne(id);
    Object.assign(colectivo, data);
    return this.colectivoRepository.save(colectivo);
  }

  //  Eliminar un colectivo
  async remove(id: number): Promise<void> {
    const result = await this.colectivoRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException('Colectivo no encontrado');
  }
}
