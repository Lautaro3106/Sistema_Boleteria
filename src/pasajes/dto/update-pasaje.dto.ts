import { PartialType } from '@nestjs/mapped-types';
import { CreatePasajeDto } from './create-pasaje.dto';

export class UpdatePasajeDto extends PartialType(CreatePasajeDto) {}
