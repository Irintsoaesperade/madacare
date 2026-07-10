import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { PatientService } from './patient.service';
import { InscrirePatientDto } from './dto/inscrire-patient.dto';

@ApiTags('Patient')
@Controller('patients')
export class PatientController {
  constructor(private patientService: PatientService) {}

  @Post('inscrire')
  @ApiOperation({ summary: "Inscription d'un patient" })
  inscrire(@Body() dto: InscrirePatientDto) {
    return this.patientService.inscrire(dto);
  }
}