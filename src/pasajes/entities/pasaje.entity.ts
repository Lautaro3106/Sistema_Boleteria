import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Viaje } from 'src/viajes/entities/viaje.entity';

@Entity()
export class Pasaje {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Viaje, (viaje) => viaje.pasajes)
  @JoinColumn({ name: 'idViaje' }) // 👈 asegura que la FK coincida con tu tabla SQL
  viaje: Viaje;

  @Column()
  nroAsiento: number;

  // 👇 CAMBIO CLAVE: asigna automáticamente la fecha actual
  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  fechaCompra: Date;

  @Column({ length: 20 })
  estado: string; // reservado, pagado, cancelado
}


