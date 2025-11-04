import { IsInt, IsOptional, Min } from 'class-validator';

export class CreatePasajeDto {
  @IsInt()
  @Min(1)
  viajeId: number; //  clave foránea del viaje

  @IsInt()
  @Min(1)
  nroAsiento: number;

  @IsOptional()
  estado?: string;
}
