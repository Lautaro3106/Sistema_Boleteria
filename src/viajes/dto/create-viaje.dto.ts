import { IsNotEmpty, IsNumber, IsDateString } from 'class-validator';

export class CreateViajeDto {
  @IsNotEmpty()
  @IsNumber()
  idColectivo: number;

  @IsNotEmpty()
  @IsNumber()
  idDestinoOrigen: number;

  @IsNotEmpty()
  @IsNumber()
  idDestinoDestino: number;

  @IsNotEmpty()
  @IsDateString()
  fechaHoraSalida: string;

  @IsNotEmpty()
  @IsDateString()
  fechaHoraLlegada: string;

  @IsNotEmpty()
  @IsNumber()
  precio: number;
}