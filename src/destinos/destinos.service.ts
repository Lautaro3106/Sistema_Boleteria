import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Destino } from './entities/destino.entity';

@Injectable()
export class DestinosService {
  constructor(
    @InjectRepository(Destino)
    private readonly destinoRepository: Repository<Destino>,
  ) {}

  // Crear un nuevo destino
  async create(data: Partial<Destino>): Promise<Destino> {
    const nuevo = this.destinoRepository.create(data);
    return this.destinoRepository.save(nuevo);
  }

  //  Obtener todos los destinos
  async findAll(): Promise<Destino[]> {
    return this.destinoRepository.find();
  }

  //  Obtener un destino por ID
  async findOne(id: number): Promise<Destino> {
    const destino = await this.destinoRepository.findOne({ where: { id } });
    if (!destino) throw new NotFoundException('Destino no encontrado');
    return destino;
  }

  //  Actualizar destino
  async update(id: number, data: Partial<Destino>): Promise<Destino> {
    const destino = await this.findOne(id);
    Object.assign(destino, data);
    return this.destinoRepository.save(destino);
  }

  //  Eliminar destino
  async remove(id: number): Promise<void> {
    const result = await this.destinoRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException('Destino no encontrado');
  }
}
