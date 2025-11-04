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

  @ManyToOne(() => Colectivo, (colectivo) => colectivo.viajes, { eager: true })
  @JoinColumn({ name: 'idColectivo' })
  colectivo: Colectivo;

  @ManyToOne(() => Destino, { eager: true })
  @JoinColumn({ name: 'idDestinoOrigen' })
  origen: Destino;

  @ManyToOne(() => Destino, { eager: true })
  @JoinColumn({ name: 'idDestinoDestino' })
  destino: Destino;

  @Column({ type: 'datetime' })
  fechaHoraSalida: Date;

  @Column({ type: 'datetime' })
  fechaHoraLlegada: Date;

  @Column('decimal', { precision: 10, scale: 2 })
  precio: number;

  @OneToMany(() => Pasaje, (pasaje) => pasaje.viaje)
  pasajes: Pasaje[];
}
