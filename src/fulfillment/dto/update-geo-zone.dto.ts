import { PartialType } from '@nestjs/mapped-types';
import { CreateGeoZoneDto } from './create-geo-zone.dto';

export class UpdateGeoZoneDto extends PartialType(CreateGeoZoneDto) {}
