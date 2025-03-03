import { PartialType } from '@nestjs/mapped-types';
import { CreateKavezoDto } from './create-kavezo.dto';

export class UpdateKavezoDto extends PartialType(CreateKavezoDto) {}
