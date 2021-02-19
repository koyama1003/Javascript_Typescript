import { PartialType } from '@nestjs/mapped-types';
import { CreateScoutDto } from './create-scout.dto';

export class UpdateScoutDto extends PartialType(CreateScoutDto) {}
