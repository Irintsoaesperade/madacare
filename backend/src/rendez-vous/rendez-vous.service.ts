import { Injectable, BadRequestException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RendezVous, StatutRdv } from '../entities/rendez-vous.entity';
import { Patient } from '../entities/patient.entity';
import { Medecin } from '../entities/medecin.entity';
import { CreerRendezVousDto } from './dto/creer-rendez-vous.dto';

@Injectable()
export class RendezVousService {
  constructor(
    @InjectRepository(RendezVous)
    private rendezVousRepository: Repository<RendezVous>,
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,
    @InjectRepository(Medecin)
    private medecinRepository: Repository<Medecin>,
  ) {}

  async creer(userId: string, dto: CreerRendezVousDto): Promise<RendezVous> {
    const patient = await this.patientRepository.findOne({
      where: { user: { id: userId } },
    });
    if (!patient) {
      throw new BadRequestException('Profil patient introuvable');
    }

    if (!patient.telephone) {
      throw new BadRequestException(
        'Merci de compléter votre téléphone dans votre profil avant de prendre rendez-vous.',
      );
    }

    const medecin = await this.medecinRepository.findOne({
      where: { id: dto.medecinId },
      relations: { hopital: true },
    });
    if (!medecin) {
      throw new BadRequestException('Médecin introuvable');
    }

    const dateHeure = new Date(dto.dateHeure);

    const conflit = await this.rendezVousRepository.findOne({
      where: {
        medecin: { id: medecin.id },
        dateHeure,
      },
    });
    if (conflit && conflit.statut !== StatutRdv.ANNULE) {
      throw new ConflictException('Ce créneau vient d\'être réservé, choisissez-en un autre');
    }

    const rdv = this.rendezVousRepository.create({
      dateHeure,
      motif: dto.motif,
      statut: StatutRdv.EN_ATTENTE,
      patient,
      medecin,
      hopital: medecin.hopital,
    });
    return this.rendezVousRepository.save(rdv);
  }

  async mesRendezVous(userId: string): Promise<RendezVous[]> {
    return this.rendezVousRepository.find({
      where: { patient: { user: { id: userId } } },
      relations: { medecin: true, hopital: true },
      order: { dateHeure: 'DESC' },
    });
  }

  async annuler(id: string, userId: string): Promise<RendezVous> {
    const rdv = await this.rendezVousRepository.findOne({
      where: { id },
      relations: { patient: { user: true } },
    });
    if (!rdv) {
      throw new BadRequestException('Rendez-vous introuvable');
    }
    if (rdv.patient.user.id !== userId) {
      throw new BadRequestException('Ce rendez-vous ne vous appartient pas');
    }
    rdv.statut = StatutRdv.ANNULE;
    return this.rendezVousRepository.save(rdv);
  }
}