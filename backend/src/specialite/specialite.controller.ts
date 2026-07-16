import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiResponse,
} from '@nestjs/swagger';
import { SpecialiteService } from './specialite.service';
import { CreerSpecialiteDto } from './dto/creer-specialite.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../entities/user.entity';

@ApiTags('Medecin')
@Controller('specialites')
export class SpecialiteController {
  constructor(private specialiteService: SpecialiteService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Créer une spécialité (Super Admin)' })
  @ApiResponse({ status: 201, description: 'Spécialité créée' })
  creer(@Body() dto: CreerSpecialiteDto) {
    return this.specialiteService.creer(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Liste des spécialités actives' })
  trouverTous() {
    return this.specialiteService.trouverTous();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Détail d\'une spécialité' })
  trouverParId(@Param('id') id: string) {
    return this.specialiteService.trouverParId(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Modifier une spécialité (Super Admin)' })
  mettreAJour(@Param('id') id: string, @Body() dto: CreerSpecialiteDto) {
    return this.specialiteService.mettreAJour(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Désactiver une spécialité (Super Admin)' })
  desactiver(@Param('id') id: string) {
    return this.specialiteService.desactiver(id);
  }
}