import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Viaje } from 'src/viajes/entities/viaje.entity';

@Entity()
export class Destino {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ciudad: string;

  @OneToMany(() => Viaje, (viaje) => viaje.origen)
  viajesOrigen: Viaje[];

  @OneToMany(() => Viaje, (viaje) => viaje.destino)
  viajesDestino: Viaje[];
}

