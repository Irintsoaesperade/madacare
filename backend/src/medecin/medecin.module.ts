import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Medecin } from '../entities/medecin.entity';
import { RendezVous } from '../entities/rendez-vous.entity';
import { MedecinController } from './medecin.controller';
import { MedecinService } from './medecin.service';

@Module({
  imports: [TypeOrmModule.forFeature([Medecin, RendezVous])],
  controllers: [MedecinController],
  providers: [MedecinService],
  exports: [MedecinService],
})
export class MedecinModule {}