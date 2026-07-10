import { Controller, Post, Get, Patch, Param, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { RendezVousService } from './rendez-vous.service';
import { CreerRendezVousDto } from './dto/creer-rendez-vous.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../entities/user.entity';

@ApiTags('Rendez-vous')
@Controller('rendez-vous')
export class RendezVousController {
  constructor(private rendezVousService: RendezVousService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.PATIENT)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Prendre un rendez-vous (Patient)' })
  creer(@Request() req, @Body() dto: CreerRendezVousDto) {
    return this.rendezVousService.creer(req.user.id, dto);
  }

  @Get('mes-rendez-vous')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.PATIENT)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Mes rendez-vous (Patient)' })
  mesRendezVous(@Request() req) {
    return this.rendezVousService.mesRendezVous(req.user.id);
  }

  @Patch(':id/annuler')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.PATIENT)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Annuler mon rendez-vous (Patient)' })
  annuler(@Param('id') id: string, @Request() req) {
    return this.rendezVousService.annuler(id, req.user.id);
  }
}