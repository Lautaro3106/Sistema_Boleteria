import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
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

    // 🔎 Buscar colectivo
    const colectivo = await this.colectivoRepository.findOne({
      where: { id: idColectivo },
    });
    if (!colectivo) throw new NotFoundException('El colectivo no existe.');

    // 🔎 Buscar destinos
    const origen = await this.destinoRepository.findOne({
      where: { id: idDestinoOrigen },
    });
    const destino = await this.destinoRepository.findOne({
      where: { id: idDestinoDestino },
    });
    if (!origen || !destino)
      throw new NotFoundException('El origen o destino no existe.');

    // ⏰ Validar fechas
    const salida = new Date(fechaHoraSalida);
    const llegada = new Date(fechaHoraLlegada);
    if (salida >= llegada) {
      throw new BadRequestException(
        'La fecha de llegada debe ser posterior a la de salida.',
      );
    }

    // 🆕 Crear nuevo viaje
    const nuevoViaje = this.viajeRepository.create({
      colectivo,
      origen,
      destino,
      fechaHoraSalida: salida,
      fechaHoraLlegada: llegada,
      precio,
    });

    return this.viajeRepository.save(nuevoViaje);
  }

  // 📤 Obtener todos los viajes
  async findAll(): Promise<Viaje[]> {
    return this.viajeRepository.find({
      relations: ['colectivo', 'origen', 'destino', 'pasajes'],
      order: { fechaHoraSalida: 'ASC' },
    });
  }

  // 🔍 Buscar viajes por origen y destino
  async findByOrigenDestino(
    idOrigen: number,
    idDestino: number,
  ): Promise<Viaje[]> {
    return this.viajeRepository.find({
      where: {
        origen: { id: idOrigen },
        destino: { id: idDestino },
      },
      relations: ['colectivo', 'origen', 'destino', 'pasajes'],
      order: { fechaHoraSalida: 'ASC' },
    });
  }

  // 📅 Buscar viajes por fecha
  async findByFecha(fecha: string): Promise<Viaje[]> {
    const date = new Date(fecha);
    const start = new Date(date);
    const end = new Date(date);
    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);

    return this.viajeRepository.find({
      where: { fechaHoraSalida: Between(start, end) },
      relations: ['colectivo', 'origen', 'destino', 'pasajes'],
      order: { fechaHoraSalida: 'ASC' },
    });
  }

  // 🔎 Buscar viajes por origen, destino y fecha combinados
  async buscarViajes(
    origenId: number,
    destinoId: number,
    fecha: string,
  ): Promise<Viaje[]> {
    const date = new Date(fecha);
    const start = new Date(date);
    const end = new Date(date);
    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);

    return this.viajeRepository.find({
      where: {
        origen: { id: origenId },
        destino: { id: destinoId },
        fechaHoraSalida: Between(start, end),
      },
      relations: ['colectivo', 'origen', 'destino', 'pasajes'],
      order: { fechaHoraSalida: 'ASC' },
    });
  }

  // 🔍 Obtener un viaje por ID
  async findOne(id: number): Promise<Viaje> {
    const viaje = await this.viajeRepository.findOne({
      where: { idViaje: id },
      relations: ['colectivo', 'origen', 'destino', 'pasajes'],
    });

    if (!viaje) throw new NotFoundException('Viaje no encontrado.');
    return viaje;
  }

  // 🔧 Actualizar un viaje existente
  async update(id: number, updateViajeDto: UpdateViajeDto): Promise<Viaje> {
    const viaje = await this.findOne(id);

    Object.assign(viaje, updateViajeDto);

    // ⚠️ Validar nuevamente si cambia fechas
    if (viaje.fechaHoraSalida >= viaje.fechaHoraLlegada) {
      throw new BadRequestException(
        'La fecha de llegada debe ser posterior a la salida.',
      );
    }

    return this.viajeRepository.save(viaje);
  }

  // 🗑️ Eliminar un viaje
  async remove(id: number): Promise<void> {
    const result = await this.viajeRepository.delete(id);
    if (result.affected === 0)
      throw new NotFoundException('Viaje no encontrado.');
  }
}
