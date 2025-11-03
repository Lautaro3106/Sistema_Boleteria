import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Viaje } from './entities/viaje.entity';
import { CreateViajeDto } from './dto/create-viaje.dto';
import { UpdateViajeDto } from './dto/update-viaje.dto';
import { Colectivo } from '../colectivos/entities/colectivo.entity';
import { Destino } from '../destinos/entities/destino.entity';

@Injectable()
export class ViajesService {
  constructor(
    @InjectRepository(Viaje)
    private readonly viajeRepository: Repository<Viaje>,

    @InjectRepository(Colectivo)
    private readonly colectivoRepository: Repository<Colectivo>,

    @InjectRepository(Destino)
    private readonly destinoRepository: Repository<Destino>,
  ) {}

  // 📥 Crear un nuevo viaje
  async create(createViajeDto: CreateViajeDto): Promise<Viaje> {
    const {
      idColectivo,
      idDestinoOrigen,
      idDestinoDestino,
      fechaHoraSalida,
      fechaHoraLlegada,
      precio,
    } = createViajeDto;

    const colectivo = await this.colectivoRepository.findOne({ where: { id: idColectivo } });
    if (!colectivo) throw new NotFoundException('El colectivo no existe');

    const origen = await this.destinoRepository.findOne({ where: { id: idDestinoOrigen } });
    const destino = await this.destinoRepository.findOne({ where: { id: idDestinoDestino } });

    if (!origen || !destino) throw new NotFoundException('El destino no existe');

    const nuevoViaje = this.viajeRepository.create({
      colectivo,
      origen,
      destino,
      fechaHoraSalida,
      fechaHoraLlegada,
      precio,
    });

    return this.viajeRepository.save(nuevoViaje);
  }

  // 📤 Obtener todos los viajes
  async findAll(): Promise<Viaje[]> {
    return this.viajeRepository.find({
      relations: ['colectivo', 'origen', 'destino', 'pasajes'],
    });
  }

  // 🔍 Buscar viajes por origen y destino
async findByOrigenDestino(idOrigen: number, idDestino: number): Promise<Viaje[]> {
  return this.viajeRepository.find({
    where: {
      origen: { id: idOrigen },
      destino: { id: idDestino },
    },
    relations: ['colectivo', 'origen', 'destino', 'pasajes'],
  });
}

// 📅 Buscar viajes por fecha de salida
async findByFecha(fecha: string): Promise<Viaje[]> {
  const fechaBusqueda = new Date(fecha);
  return this.viajeRepository
    .createQueryBuilder('viaje')
    .leftJoinAndSelect('viaje.colectivo', 'colectivo')
    .leftJoinAndSelect('viaje.origen', 'origen')
    .leftJoinAndSelect('viaje.destino', 'destino')
    .leftJoinAndSelect('viaje.pasajes', 'pasajes')
    .where('DATE(viaje.fechaHoraSalida) = DATE(:fecha)', { fecha: fechaBusqueda })
    .getMany();
}

// 🔎 Buscar viajes por origen, destino y fecha (combinado)
async buscarViajes(origenId: number, destinoId: number, fecha: string): Promise<Viaje[]> {
  const fechaBusqueda = new Date(fecha);
  return this.viajeRepository
    .createQueryBuilder('viaje')
    .leftJoinAndSelect('viaje.colectivo', 'colectivo')
    .leftJoinAndSelect('viaje.origen', 'origen')
    .leftJoinAndSelect('viaje.destino', 'destino')
    .leftJoinAndSelect('viaje.pasajes', 'pasajes')
    .where('origen.id = :origenId', { origenId })
    .andWhere('destino.id = :destinoId', { destinoId })
    .andWhere('DATE(viaje.fechaHoraSalida) = DATE(:fecha)', { fecha: fechaBusqueda })
    .getMany();
}


  // 🔍 Obtener un viaje por ID
  async findOne(id: number): Promise<Viaje> {
    const viaje = await this.viajeRepository.findOne({
      where: { idViaje: id },
      relations: ['colectivo', 'origen', 'destino', 'pasajes'],
    });

    if (!viaje) throw new NotFoundException('Viaje no encontrado');
    return viaje;
  }

  // 🔧 Actualizar viaje
  async update(id: number, updateViajeDto: UpdateViajeDto): Promise<Viaje> {
    const viaje = await this.findOne(id);
    Object.assign(viaje, updateViajeDto);
    return this.viajeRepository.save(viaje);
  }

  // 🗑️ Eliminar viaje
  async remove(id: number): Promise<void> {
    const result = await this.viajeRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException('Viaje no encontrado');
  }
}
