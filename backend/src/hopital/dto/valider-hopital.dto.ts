import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { StatutHopital } from '../../entities/hopital.entity';

export class ValiderHopitalDto {
  @ApiProperty({ enum: StatutHopital, example: StatutHopital.VALIDE })
  @IsEnum(StatutHopital)
  statut: StatutHopital;

  @ApiPropertyOptional({ example: 'Documents incomplets' })
  @IsOptional()
  @IsString()
  motifRejet?: string;
}