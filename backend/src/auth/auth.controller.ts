import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Connexion utilisateur' })
  @ApiResponse({ status: 200, description: 'Connexion réussie — retourne JWT' })
  @ApiResponse({ status: 401, description: 'Email ou mot de passe incorrect' })
  async seConnecter(@Body() loginDto: LoginDto) {
    return this.authService.seConnecter(loginDto.email, loginDto.motDePasse);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Rafraîchir le token JWT' })
  @ApiResponse({ status: 200, description: 'Nouveau token généré' })
  async rafraichirToken(@Body('refreshToken') refreshToken: string) {
    return this.authService.rafraichirToken(refreshToken);
  }
}