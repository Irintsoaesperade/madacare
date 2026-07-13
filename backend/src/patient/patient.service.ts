import { Injectable, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from '../entities/patient.entity';
import { User, Role } from '../entities/user.entity';
import { DossierMedical } from '../entities/dossier-medical.entity';
import { InscrirePatientDto } from './dto/inscrire-patient.dto';
import { ModifierPatientDto } from './dto/modifier-patient.dto';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(DossierMedical)
    private dossierMedicalRepository: Repository<DossierMedical>,
    private authService: AuthService,
  ) {}

  async inscrire(dto: InscrirePatientDto): Promise<{ message: string }> {
    const emailExistant = await this.userRepository.findOne({
      where: { email: dto.email },
    });
    if (emailExistant) {
      throw new ConflictException('Cet email est déjà utilisé');
    }

    const motDePasseHache = await this.authService.hacherMotDePasse(
      dto.motDePasse,
    );

    const user = this.userRepository.create({
      email: dto.email,
      motDePasse: motDePasseHache,
      role: Role.PATIENT,
      emailVerifie: true, // simplifié pour le MVP
      actif: true,
    });
    const userSauvegarde = await this.userRepository.save(user);

    const patient = this.patientRepository.create({
      nom: dto.nom,
      prenom: dto.prenom,
      dateNaissance: dto.dateNaissance ? new Date(dto.dateNaissance) : undefined,
      sexe: dto.sexe,
      telephone: dto.telephone,
      lieuNaissance: dto.lieuNaissance,
      adresse: dto.adresse,
      user: userSauvegarde,
    });
    const patientSauvegarde = await this.patientRepository.save(patient);

    // Le dossier médical est créé vide, automatiquement, en même temps que le patient
    const dossierVide = this.dossierMedicalRepository.create({
      patient: patientSauvegarde,
      allergies: [],
      maladiesChroniques: [],
      medicamentsEnCours: [],
    });
    await this.dossierMedicalRepository.save(dossierVide);

    return { message: 'Inscription réussie. Vous pouvez vous connecter.' };
  }

  async trouverParId(id: string): Promise<Patient> {
    const patient = await this.patientRepository.findOne({
      where: { id },
      relations: { user: true },
    });
    if (!patient) {
      throw new BadRequestException('Patient introuvable');
    }
    return patient;
  }

  async trouverParUserId(userId: string): Promise<Patient> {
    const patient = await this.patientRepository.findOne({
      where: { user: { id: userId } },
      relations: { user: true },
    });
    if (!patient) {
      throw new BadRequestException('Patient introuvable');
    }
    return patient;
  }

  async monProfil(userId: string): Promise<Patient> {
    return this.trouverParUserId(userId);
  }

 async modifierProfil(
    userId: string,
    dto: ModifierPatientDto,
  ): Promise<Patient> {
    const patient = await this.trouverParUserId(userId);
    Object.assign(patient, dto);
    return this.patientRepository.save(patient);
  }
}