import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsBoolean,
  IsArray,
  IsMongoId,
  IsObject,
} from 'class-validator';

export class CreateFulfillmentDto {
  @ApiProperty({ description: 'ID de la commande liée' })
  @IsString()
  @IsMongoId()
  order: string;

  @ApiProperty({ description: 'ID de l’emplacement (entrepôt)' })
  @IsString()
  location_id: string;

  @ApiPropertyOptional({ description: 'ID de l’utilisateur qui crée le fulfillment' })
  @IsOptional()
  @IsString()
  created_by?: string;

  @ApiPropertyOptional({ description: 'Indique si une expédition est requise' })
  @IsOptional()
  @IsBoolean()
  requires_shipping?: boolean;

  @ApiPropertyOptional({ description: 'Liste des IDs des items à expédier' })
  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  items?: string[];

  @ApiPropertyOptional({ description: 'ID de l’option d’expédition choisie' })
  @IsOptional()
  @IsMongoId()
  shipping_option?: string;

  @ApiPropertyOptional({ description: 'ID du fournisseur de fulfillment' })
  @IsOptional()
  @IsMongoId()
  provider?: string;

  @ApiPropertyOptional({ description: 'ID de l’adresse de livraison' })
  @IsOptional()
  @IsMongoId()
  delivery_address?: string;

  @ApiPropertyOptional({ description: 'Données supplémentaires (métadonnées)' })
  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;
}
