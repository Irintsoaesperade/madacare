import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { MedecinService } from './medecin.service';

@ApiTags('Medecin')
@Controller('medecins')
export class MedecinController {
  constructor(private medecinService: MedecinService) {}

  @Get()
  @ApiOperation({ summary: "Liste des médecins d'un hôpital" })
  @ApiQuery({ name: 'hopitalId', required: true })
  trouverParHopital(@Query('hopitalId') hopitalId: string) {
    return this.medecinService.trouverParHopital(hopitalId);
  }

  @Get(':id')
  @ApiOperation({ summary: "Détail d'un médecin" })
  trouverParId(@Param('id') id: string) {
    return this.medecinService.trouverParId(id);
  }

  @Get(':id/creneaux-disponibles')
  @ApiOperation({ summary: "Créneaux disponibles d'un médecin pour une date" })
  @ApiQuery({ name: 'date', required: true, example: '2026-07-15' })
  creneauxDisponibles(@Param('id') id: string, @Query('date') date: string) {
    return this.medecinService.creneauxDisponibles(id, date);
  }
}