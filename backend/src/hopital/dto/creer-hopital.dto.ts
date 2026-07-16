import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  MinLength,
  IsUrl,
} from 'class-validator';

export enum TypeHopital {
  CSB1 = 'CSB1',
  CSB2 = 'CSB2',
  CHD1 = 'CHD1',
  CHD2 = 'CHD2',
  CHU = 'CHU',
  CLINIQUE_PRIVEE = 'CLINIQUE_PRIVEE',
  HOPITAL_PRIVE = 'HOPITAL_PRIVE',
  POLYCLINIQUE = 'POLYCLINIQUE',
  MATERNITE = 'MATERNITE',
  CABINET_MEDICAL = 'CABINET_MEDICAL',
}

export class CreerHopitalDto {
  // ── Informations principales ──────────────────────────

  @ApiProperty({ example: 'Hôpital HJRA' })
  @IsString()
  @IsNotEmpty()
  nom: string;

  @ApiProperty({ enum: TypeHopital, example: TypeHopital.CHU })
  @IsString()
  @IsNotEmpty()
  type: TypeHopital;

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

  @ApiPropertyOptional({ example: '-18.9137, 47.5361' })
  @IsOptional()
  @IsString()
  localisation: string;

  // ── Contact ──────────────────────────────────────────

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

  @ApiPropertyOptional({ example: '+261 34 00 000 00' })
  @IsOptional()
  @IsString()
  telephoneUrgence: string;

  @ApiPropertyOptional({ example: 'https://www.hjra.mg' })
  @IsOptional()
  @IsString()
  siteWeb: string;

  // ── Profil public ─────────────────────────────────────

  @ApiPropertyOptional({ example: 'https://minio.madacare.mg/logos/hjra.png' })
  @IsOptional()
  @IsString()
  logoUrl: string;

  @ApiPropertyOptional({ example: 'Votre santé, notre priorité' })
  @IsOptional()
  @IsString()
  slogan: string;

  @ApiPropertyOptional({ example: 'Cardiologie, Pédiatrie, Neurologie' })
  @IsOptional()
  @IsString()
  services: string;

  @ApiPropertyOptional({ example: '08:00' })
  @IsOptional()
  @IsString()
  heureOuverture: string;

  @ApiPropertyOptional({ example: '17:00' })
  @IsOptional()
  @IsString()
  heureFermeture: string;

  // ── Direction ─────────────────────────────────────────

  @ApiPropertyOptional({ example: 'Dr. Rakoto Jean' })
  @IsOptional()
  @IsString()
  nomDirecteurMedical: string;

  @ApiPropertyOptional({ example: '101 234 567 890' })
  @IsOptional()
  @IsString()
  cinDirecteur: string;

  // ── Documents légaux (optionnels à l'inscription) ─────

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
}