import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'superadmin@madacare.mg' })
  @IsEmail({}, { message: 'Email invalide' })
  email: string;

  @ApiProperty({ example: 'SuperAdmin@2026!' })
  @IsString()
  @MinLength(6, { message: 'Mot de passe trop court' })
  motDePasse: string;
}