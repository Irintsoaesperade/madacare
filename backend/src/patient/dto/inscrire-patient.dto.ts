import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  IsNotEmpty,
  MinLength,
  IsOptional,
  IsEnum,
  IsDateString,
} from 'class-validator';
import { Sexe } from '../../entities/patient.entity';

export class InscrirePatientDto {
  @ApiProperty({ example: 'rakoto@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'MotDePasse123' })
  @IsString()
  @MinLength(6)
  motDePasse: string;

  @ApiProperty({ example: 'Rakoto' })
  @IsString()
  @IsNotEmpty()
  nom: string;

  @ApiProperty({ example: 'Jean' })
  @IsString()
  @IsNotEmpty()
  prenom: string;

  @ApiProperty({ example: '1995-05-20', required: false })
  @IsOptional()
  @IsDateString()
  dateNaissance?: string;

  @ApiProperty({ enum: Sexe, required: false })
  @IsOptional()
  @IsEnum(Sexe)
  sexe?: Sexe;

  @ApiProperty({ example: '101123456789', required: false })
  @IsOptional()
  @IsString()
  cin?: string;

  @ApiProperty({ example: '0341234567', required: false })
  @IsOptional()
  @IsString()
  telephone?: string;
}