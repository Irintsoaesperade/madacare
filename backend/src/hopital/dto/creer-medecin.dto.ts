import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty, IsUUID, IsOptional } from 'class-validator';

export class CreerMedecinDto {
  @ApiProperty({ example: 'Rasoa' })
  @IsString()
  @IsNotEmpty()
  nom: string;

  @ApiProperty({ example: 'Marie' })
  @IsString()
  @IsNotEmpty()
  prenom: string;

  @ApiProperty({ example: 'medecin@hjra.mg' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'ORD-2021-00142' })
  @IsString()
  @IsNotEmpty()
  numeroOrdre: string;

  @ApiProperty({ example: 'uuid-de-la-specialite' })
  @IsUUID()
  specialiteId: string;

  @ApiPropertyOptional({ example: 'Cardiologie département principal' })
  @IsOptional()
  @IsString()
  description?: string;
}