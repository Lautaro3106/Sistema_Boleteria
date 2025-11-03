import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Viaje } from 'src/viajes/entities/viaje.entity';

@Entity()
export class Colectivo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20 })
  patente: string;

  @Column({ length: 50 })
  modelo: string;

  @Column()
  capacidad: number;

  @OneToMany(() => Viaje, (viaje) => viaje.colectivo)
  viajes: Viaje[];
}
