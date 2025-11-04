import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';
import { Pasaje } from './entities/pasaje.entity';
import { Viaje } from 'src/viajes/entities/viaje.entity';

@Injectable()
export class PasajesService {
  constructor(
    @InjectRepository(Pasaje)
    private readonly pasajeRepository: Repository<Pasaje>,

    @InjectRepository(Viaje)
    private readonly viajeRepository: Repository<Viaje>,
  ) {}

  //  Crear un nuevo pasaje
  async crearPasaje(data: {
    viajeId: number;
    nroAsiento: number;
    nombrePasajero?: string;
    dniPasajero?: string;
    estado?: string;
  }): Promise<Pasaje> {
    const { viajeId, nroAsiento, nombrePasajero, dniPasajero, estado } = data;

    //  Buscar viaje y validar existencia
    const viaje = await this.viajeRepository.findOne({
      where: { idViaje: viajeId },
      relations: ['colectivo', 'pasajes'],
    });
    if (!viaje) throw new NotFoundException('El viaje no existe.');

    //  Validar capacidad del colectivo
    const capacidad = viaje.colectivo.capacidad;
    const cantidadVendida = await this.pasajeRepository.count({
      where: {
        viaje: { idViaje: viajeId },
        estado: Not('cancelado'),
      },
    });
    if (cantidadVendida >= capacidad) {
      throw new BadRequestException(
        'No se pueden vender más pasajes: el colectivo está completo.',
      );
    }

    //  Validar que el asiento no esté ocupado
    const asientoOcupado = await this.pasajeRepository.findOne({
      where: {
        viaje: { idViaje: viajeId },
        nroAsiento,
        estado: Not('cancelado'),
      },
    });
    if (asientoOcupado) {
      throw new BadRequestException(
        `El asiento ${nroAsiento} ya está ocupado.`,
      );
    }

    //  Validar datos del pasajero
    if (!nombrePasajero || !dniPasajero) {
      throw new BadRequestException(
        'Debe especificar nombre y DNI del pasajero.',
      );
    }

    //  Crear y guardar pasaje
    const nuevoPasaje = this.pasajeRepository.create({
      viaje,
      nroAsiento,
      nombrePasajero,
      dniPasajero,
      estado: estado || 'reservado',
    });

    const guardado = await this.pasajeRepository.save(nuevoPasaje);
    console.log('✅ Pasaje guardado:', guardado);

    return guardado;
  }

  //  Obtener todos los pasajes (opcional: filtro por viaje)
  async obtenerTodos(viajeId?: number): Promise<Pasaje[]> {
    if (viajeId) {
      return this.pasajeRepository.find({
        where: { viaje: { idViaje: viajeId } },
        relations: ['viaje', 'viaje.colectivo', 'viaje.origen', 'viaje.destino'],
      });
    }

    return this.pasajeRepository.find({
      relations: ['viaje', 'viaje.colectivo', 'viaje.origen', 'viaje.destino'],
    });
  }

  //  Eliminar un pasaje
  async eliminarPasaje(id: number): Promise<void> {
    const result = await this.pasajeRepository.delete(id);
    if (result.affected === 0)
      throw new NotFoundException('Pasaje no encontrado.');
  }

  //  Actualizar el estado de un pasaje
  async actualizarEstado(id: number, nuevoEstado: string): Promise<Pasaje> {
    const pasaje = await this.pasajeRepository.findOne({
      where: { idPasaje: id },
      relations: ['viaje', 'viaje.colectivo'],
    });

    if (!pasaje) throw new NotFoundException('Pasaje no encontrado.');

    //  Validar transición de estados
    const estadosValidos = ['reservado', 'pagado', 'cancelado'];
    if (!estadosValidos.includes(nuevoEstado)) {
      throw new BadRequestException(
        'El estado debe ser "reservado", "pagado" o "cancelado".',
      );
    }

    pasaje.estado = nuevoEstado;
    return this.pasajeRepository.save(pasaje);
  }
}
