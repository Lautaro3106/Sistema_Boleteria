import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Viaje } from 'src/viajes/entities/viaje.entity';

@Entity()
export class Pasaje {
  @PrimaryGeneratedColumn()
  idPasaje: number; 

  @ManyToOne(() => Viaje, (viaje) => viaje.pasajes, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'idViaje' }) // clave foránea
  viaje: Viaje;

  @Column()
  nroAsiento: number;

  @Column({ length: 100 })
  nombrePasajero: string; 

  @Column({ length: 20 })
  dniPasajero: string; 

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  fechaCompra: Date;

  @Column({ length: 20, default: 'reservado' })
  estado: string; // reservado, pagado, cancelado
}


