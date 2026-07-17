import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsEnum,
  IsDateString,
  Matches,
  MaxLength,
} from 'class-validator';
import { IsNotFutureDate } from '../validators/is-not-future-date.validator';
import { Sexe } from '../../entities/patient.entity';

export class ModifierPatientDto {
  @ApiProperty({ required: false, example: 'Rakoto' })
  @IsOptional()
  @IsString()
  @Matches(/^[a-zA-ZÀ-ÿ\s'-]+$/, {
    message: 'Le nom ne doit contenir que des lettres',
  })
  nom?: string;

  @ApiProperty({ required: false, example: 'Jean' })
  @IsOptional()
  @IsString()
  @Matches(/^[a-zA-ZÀ-ÿ\s'-]+$/, {
    message: 'Le prénom ne doit contenir que des lettres',
  })
  prenom?: string;

  @ApiProperty({ required: false, example: '1995-05-20' })
  @IsOptional()
  @IsDateString()
  @IsNotFutureDate()
  dateNaissance?: string;

  @ApiProperty({ required: false, example: 'Fianarantsoa' })
  @IsOptional()
  @Matches(/^[a-zA-ZÀ-ÿ\s'-]+$/, {
    message: 'Le lieu de naissance ne doit contenir que des lettres',
  })
  lieuNaissance?: string;

  @ApiProperty({ enum: Sexe, required: false })
  @IsOptional()
  @IsEnum(Sexe)
  sexe?: Sexe;

  @ApiProperty({ required: false, example: '0341234567' })
  @IsOptional()
  @Matches(/^0[0-9]{9}$/, {
    message: 'Le téléphone doit être au format malgache (10 chiffres, commence par 0)',
  })
  telephone?: string;

  @ApiProperty({ required: false, example: 'Lot II A 45 Ampasambazaha, Fianarantsoa' })
  @IsOptional()
  @IsString()
  @MaxLength(255, {
    message: "L'adresse ne doit pas dépasser 255 caractères",
  })
  adresse?: string;
}