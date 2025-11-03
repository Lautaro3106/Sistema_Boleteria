import { IsInt, IsNumber, IsDateString, IsNotEmpty } from 'class-validator';

export class CreateViajeDto {
  @IsInt()
  idColectivo: number;

  @IsInt()
  idDestinoOrigen: number;

  @IsInt()
  idDestinoDestino: number;

  @IsDateString()
  fechaHoraSalida: string;

  @IsDateString()
  fechaHoraLlegada: string;

  @IsNumber()
  @IsNotEmpty()
  precio: number;
}
