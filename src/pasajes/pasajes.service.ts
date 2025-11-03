import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  async crearPasaje(data: {
    viajeId: number;
    nroAsiento: number;
    estado?: string;
  }): Promise<Pasaje> {

    console.log('🟢 Datos recibidos:', data); // LOG 1

    const { viajeId, nroAsiento, estado } = data;

    const viaje = await this.viajeRepository.findOne({
      where: { idViaje: viajeId },
      relations: ['colectivo', 'pasajes'],
    });

    console.log('🚌 Viaje encontrado:', viaje); // LOG 2

    if (!viaje) {
      throw new NotFoundException('El viaje no existe');
    }

    // Verificar capacidad del colectivo
    const capacidad = viaje.colectivo.capacidad;
    const cantidadVendida = await this.pasajeRepository.count({
      where: { viaje: { idViaje: viajeId }, estado: 'pagado' },
    });

    console.log(`🎟️ Cantidad vendida: ${cantidadVendida}/${capacidad}`); // LOG 3

    if (cantidadVendida >= capacidad) {
      throw new BadRequestException(
        'No se pueden vender más pasajes: el colectivo está completo.',
      );
    }

    // Verificar que el nroAsiento no esté ocupado
    const asientoOcupado = await this.pasajeRepository.findOne({
      where: {
        viaje: { idViaje: viajeId },
        nroAsiento,
        estado: 'pagado',
      },
    });

    console.log('💺 Asiento ocupado:', asientoOcupado); // LOG 4

    if (asientoOcupado) {
      throw new BadRequestException(
        `El asiento ${nroAsiento} ya está ocupado.`,
      );
    }

    // Crear el pasaje
    const nuevoPasaje = this.pasajeRepository.create({
      viaje,
      nroAsiento,
      estado: estado || 'reservado',
    });

    console.log('💾 Guardando pasaje:', nuevoPasaje); // LOG 5

    const guardado = await this.pasajeRepository.save(nuevoPasaje);

    console.log('✅ Pasaje guardado correctamente:', guardado); // LOG 6

    return guardado;
  }

  async obtenerTodos(): Promise<Pasaje[]> {
    return this.pasajeRepository.find({ relations: ['viaje'] });
  }

  async eliminarPasaje(id: number): Promise<void> {
    const result = await this.pasajeRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Pasaje no encontrado');
    }
  }

  async actualizarEstado(id: number, nuevoEstado: string): Promise<Pasaje> {
    const pasaje = await this.pasajeRepository.findOne({
      where: { id },
      relations: ['viaje', 'viaje.colectivo'],
    });

    if (!pasaje) {
      throw new NotFoundException('Pasaje no encontrado');
    }

    if (nuevoEstado === 'cancelado' && pasaje.estado === 'pagado') {
      // aquí podrías manejar reembolsos u otra lógica
    }

    pasaje.estado = nuevoEstado;
    return this.pasajeRepository.save(pasaje);
  }
}
