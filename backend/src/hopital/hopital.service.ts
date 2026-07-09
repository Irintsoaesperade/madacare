import {
  Injectable,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hopital, StatutHopital } from '../entities/hopital.entity';
import { User, Role } from '../entities/user.entity';
import { CreerHopitalDto } from './dto/creer-hopital.dto';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class HopitalService {
  constructor(
    @InjectRepository(Hopital)
    private hopitalRepository: Repository<Hopital>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private authService: AuthService,
  ) {}

  async inscrire(dto: CreerHopitalDto): Promise<{ message: string }> {
    // Vérifier si l'email existe déjà
    const emailExistant = await this.userRepository.findOne({
      where: { email: dto.email },
    });
    if (emailExistant) {
      throw new ConflictException('Cet email est déjà utilisé');
    }

    // Hacher le mot de passe
    const motDePasseHache = await this.authService.hacherMotDePasse(
      dto.motDePasse,
    );

    // Créer le compte User Admin Hôpital
    const user = this.userRepository.create({
      email: dto.email,
      motDePasse: motDePasseHache,
      role: Role.HOPITAL_ADMIN,
      emailVerifie: true, // simplifié pour le MVP
      actif: true,
    });
    const userSauvegarde = await this.userRepository.save(user);

    // Créer le profil Hôpital
    const hopital = this.hopitalRepository.create({
      nom: dto.nom,
      adresse: dto.adresse,
      ville: dto.ville,
      region: dto.region,
      telephone: dto.telephone,
      nomDirecteurMedical: dto.nomDirecteurMedical,
      cinDirecteur: dto.cinDirecteur,
      numeroAgrement: dto.numeroAgrement,
      nif: dto.nif,
      stat: dto.stat,
      heureOuverture: dto.heureOuverture,
      heureFermeture: dto.heureFermeture,
      statut: StatutHopital.EN_ATTENTE_VALIDATION,
      user: userSauvegarde,
    });
    await this.hopitalRepository.save(hopital);

    return {
      message:
        'Inscription soumise avec succès. Votre dossier est en attente de validation par le Super Admin.',
    };
  }

  async trouverTous(): Promise<Hopital[]> {
    return this.hopitalRepository.find({
     relations: { user: true },
      order: { createdAt: 'DESC' },
    });
  }

  async trouverEnAttente(): Promise<Hopital[]> {
    return this.hopitalRepository.find({
      where: { statut: StatutHopital.EN_ATTENTE_VALIDATION },
      relations: { user: true },
      order: { createdAt: 'DESC' },
    });
  }

  async trouverParId(id: string): Promise<Hopital> {
    const hopital = await this.hopitalRepository.findOne({
      where: { id },
      relations: { user: true, medecins: true },
    });
    if (!hopital) {
      throw new BadRequestException('Hôpital introuvable');
    }
    return hopital;
  }

  async valider(
    id: string,
    statut: StatutHopital,
    motifRejet?: string,
  ): Promise<Hopital> {
    const hopital = await this.trouverParId(id);
    hopital.statut = statut;
    if (motifRejet) hopital.motifRejet = motifRejet;
    if (statut === StatutHopital.VALIDE) {
      hopital.dateValidation = new Date();
      // Revalidation dans 1 an
      const revalidation = new Date();
      revalidation.setFullYear(revalidation.getFullYear() + 1);
      hopital.dateRevalidation = revalidation;
    }
    return this.hopitalRepository.save(hopital);
  }

  async mettreAJour(id: string, data: Partial<Hopital>): Promise<Hopital> {
    await this.hopitalRepository.save({ id, ...data });
    return this.trouverParId(id);
  }
}