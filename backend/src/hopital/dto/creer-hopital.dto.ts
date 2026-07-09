import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  MinLength,
} from 'class-validator';

export class CreerHopitalDto {
  @ApiProperty({ example: 'Hôpital HJRA' })
  @IsString()
  @IsNotEmpty()
  nom: string;

  @ApiProperty({ example: 'Ampefiloha, Antananarivo' })
  @IsString()
  @IsNotEmpty()
  adresse: string;

  @ApiProperty({ example: 'Antananarivo' })
  @IsString()
  @IsNotEmpty()
  ville: string;

  @ApiProperty({ example: 'Analamanga' })
  @IsString()
  @IsNotEmpty()
  region: string;

  @ApiProperty({ example: 'admin@hjra.mg' })
  @IsEmail({}, { message: 'Email invalide' })
  email: string;

  @ApiProperty({ example: 'MotDePasse@2026!' })
  @IsString()
  @MinLength(8, { message: 'Mot de passe trop court (8 caractères minimum)' })
  motDePasse: string;

  @ApiPropertyOptional({ example: '+261 20 22 123 45' })
  @IsOptional()
  @IsString()
  telephone: string;

  @ApiPropertyOptional({ example: 'Dr. Rakoto Jean' })
  @IsOptional()
  @IsString()
  nomDirecteurMedical: string;

  @ApiPropertyOptional({ example: '101 234 567 890' })
  @IsOptional()
  @IsString()
  cinDirecteur: string;

  @ApiPropertyOptional({ example: 'MSANP-2021-00142' })
  @IsOptional()
  @IsString()
  numeroAgrement: string;

  @ApiPropertyOptional({ example: '4000123456' })
  @IsOptional()
  @IsString()
  nif: string;

  @ApiPropertyOptional({ example: '12345678901234' })
  @IsOptional()
  @IsString()
  stat: string;

  @ApiPropertyOptional({ example: '08:00' })
  @IsOptional()
  @IsString()
  heureOuverture: string;

  @ApiPropertyOptional({ example: '17:00' })
  @IsOptional()
  @IsString()
  heureFermeture: string;
}