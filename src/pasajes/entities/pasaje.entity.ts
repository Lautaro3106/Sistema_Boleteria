import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Viaje } from 'src/viajes/entities/viaje.entity';

@Entity()
export class Pasaje {
  @PrimaryGeneratedColumn()
  idPasaje: number; // ✅ mejor usar un nombre más explícito

  @ManyToOne(() => Viaje, (viaje) => viaje.pasajes, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'idViaje' }) // clave foránea
  viaje: Viaje;

  @Column()
  nroAsiento: number;

  @Column({ length: 100 })
  nombrePasajero: string; // ✅ agregado

  @Column({ length: 20 })
  dniPasajero: string; // ✅ agregado

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  fechaCompra: Date;

  @Column({ length: 20, default: 'reservado' })
  estado: string; // reservado, pagado, cancelado
}


