import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreerSpecialiteDto {
  @ApiProperty({ example: 'Cardiologie' })
  @IsString()
  @IsNotEmpty()
  nom: string;
}