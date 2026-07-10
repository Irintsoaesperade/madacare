import {
  Controller,
  Post,
  Get,
  Patch,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { PatientService } from './patient.service';
import { InscrirePatientDto } from './dto/inscrire-patient.dto';
import { ModifierPatientDto } from './dto/modifier-patient.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../entities/user.entity';

@ApiTags('Patient')
@Controller('patients')
export class PatientController {
  constructor(private patientService: PatientService) {}

  @Post('inscrire')
  @ApiOperation({ summary: "Inscription d'un patient" })
  inscrire(@Body() dto: InscrirePatientDto) {
    return this.patientService.inscrire(dto);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.PATIENT)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Mon profil (Patient)' })
  monProfil(@Request() req) {
    return this.patientService.monProfil(req.user.id);
  }

  @Patch('me')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.PATIENT)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Modifier mon profil (Patient)' })
  modifierProfil(@Request() req, @Body() dto: ModifierPatientDto) {
    return this.patientService.modifierProfil(req.user.id, dto);
  }
}