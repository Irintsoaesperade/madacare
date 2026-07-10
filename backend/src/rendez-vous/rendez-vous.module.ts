import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RendezVous } from '../entities/rendez-vous.entity';
import { Patient } from '../entities/patient.entity';
import { Medecin } from '../entities/medecin.entity';
import { RendezVousController } from './rendez-vous.controller';
import { RendezVousService } from './rendez-vous.service';

@Module({
  imports: [TypeOrmModule.forFeature([RendezVous, Patient, Medecin])],
  controllers: [RendezVousController],
  providers: [RendezVousService],
})
export class RendezVousModule {}