import {
  Controller,
  Post,
  Get,
  Patch,
  Param,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { HopitalService } from './hopital.service';
import { CreerHopitalDto } from './dto/creer-hopital.dto';
import { CreerMedecinDto } from './dto/creer-medecin.dto';
import { ValiderHopitalDto } from './dto/valider-hopital.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../entities/user.entity';
import { StatutHopital } from '../entities/hopital.entity';

@ApiTags('Hopital')
@Controller('hopitaux')
export class HopitalController {
  constructor(private hopitalService: HopitalService) {}

  @Post('inscrire')
  @ApiOperation({ summary: 'Inscription d\'un hôpital' })
  @ApiResponse({ status: 201, description: 'Inscription soumise avec succès' })
  @ApiResponse({ status: 409, description: 'Email déjà utilisé' })
  inscrire(@Body() dto: CreerHopitalDto) {
    return this.hopitalService.inscrire(dto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Liste tous les hôpitaux (Super Admin)' })
  trouverTous() {
    return this.hopitalService.trouverTous();
  }

  @Get('en-attente')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Hôpitaux en attente de validation (Super Admin)' })
  trouverEnAttente() {
    return this.hopitalService.trouverEnAttente();
  }

  @Get('me/profil')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.HOPITAL_ADMIN)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Profil de mon hôpital (Admin Hôpital)' })
  async monProfil(@Request() req) {
    const hopitaux = await this.hopitalService.trouverTous();
    return hopitaux.find((h) => h.user.id === req.user.id);
  }

  @Get('me/medecins')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.HOPITAL_ADMIN)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Liste des médecins de mon hôpital' })
  async mesMedecins(@Request() req) {
    const hopitaux = await this.hopitalService.trouverTous();
    const monHopital = hopitaux.find((h) => h.user.id === req.user.id);
    if (!monHopital) return [];
    return this.hopitalService.trouverMedecins(monHopital.id);
  }

  @Post('me/medecins')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.HOPITAL_ADMIN)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Créer un compte médecin (Admin Hôpital)' })
  @ApiResponse({ status: 201, description: 'Compte médecin créé, email envoyé' })
  @ApiResponse({ status: 409, description: 'Email ou numéro d\'ordre déjà utilisé' })
  async creerMedecin(@Request() req, @Body() dto: CreerMedecinDto) {
    const hopitaux = await this.hopitalService.trouverTous();
    const monHopital = hopitaux.find((h) => h.user.id === req.user.id);
    if (!monHopital) {
      throw new Error('Hôpital introuvable pour cet admin');
    }
    return this.hopitalService.creerMedecin(monHopital.id, dto);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN, Role.HOPITAL_ADMIN)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Détail d\'un hôpital' })
  trouverParId(@Param('id') id: string) {
    return this.hopitalService.trouverParId(id);
  }

  @Patch(':id/valider')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Valider / rejeter un hôpital (Super Admin)' })
  valider(@Param('id') id: string, @Body() dto: ValiderHopitalDto) {
    return this.hopitalService.valider(id, dto.statut, dto.motifRejet);
  }
}