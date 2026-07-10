import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsDateString, IsString, IsNotEmpty } from 'class-validator';

export class CreerRendezVousDto {
  @ApiProperty({ example: 'uuid-du-medecin' })
  @IsUUID()
  medecinId: string;

  @ApiProperty({ example: '2026-07-15T09:00:00.000Z' })
  @IsDateString()
  dateHeure: string;

  @ApiProperty({ example: 'Consultation générale' })
  @IsString()
  @IsNotEmpty()
  motif: string;
}