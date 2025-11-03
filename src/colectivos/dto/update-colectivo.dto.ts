import { PartialType } from '@nestjs/mapped-types';
import { CreateColectivoDto } from './create-colectivo.dto';

export class UpdateColectivoDto extends PartialType(CreateColectivoDto) {}
