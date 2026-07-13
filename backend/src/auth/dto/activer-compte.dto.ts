import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class ActiverCompteDto {
  @ApiProperty({ example: 'token-recu-par-email' })
  @IsString()
  token: string;

  @ApiProperty({ example: 'NouveauMotDePasse@2026!' })
  @IsString()
  @MinLength(8)
  nouveauMotDePasse: string;
}