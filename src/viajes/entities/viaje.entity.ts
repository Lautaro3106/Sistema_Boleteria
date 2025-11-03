import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Colectivo } from '../../colectivos/entities/colectivo.entity';
import { Destino } from '../../destinos/entities/destino.entity';
import { Pasaje } from '../../pasajes/entities/pasaje.entity';

@Entity()
export class Viaje {
  @PrimaryGeneratedColumn()
  idViaje: number;

  // 🔗 Relación con Colectivo
  @ManyToOne(() => Colectivo, (colectivo) => colectivo.viajes, { eager: true })
  @JoinColumn({ name: 'idColectivo' })
  colectivo: Colectivo;

  // 🔗 Relación con el destino de origen
  @ManyToOne(() => Destino, { eager: true })
  @JoinColumn({ name: 'idDestinoOrigen' })
  origen: Destino;

  // 🔗 Relación con el destino de llegada
  @ManyToOne(() => Destino, { eager: true })
  @JoinColumn({ name: 'idDestinoDestino' })
  destino: Destino;

  // 📅 Fechas del viaje
  @Column({ type: 'datetime', nullable: false })
  fechaHoraSalida: Date;

  @Column({ type: 'datetime', nullable: false })
  fechaHoraLlegada: Date;

  // 💰 Precio del pasaje
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  precio: number;

  // 🎟️ Relación con pasajes
  @OneToMany(() => Pasaje, (pasaje) => pasaje.viaje, { cascade: true })
  pasajes: Pasaje[];
}
