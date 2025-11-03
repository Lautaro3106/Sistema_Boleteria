import { IsEnum } from 'class-validator';

export class UpdateEstadoPasajeDto {
  @IsEnum(['reservado', 'pagado', 'cancelado'], {
    message: 'El estado debe ser reservado, pagado o cancelado',
  })
  estado: string;
}
