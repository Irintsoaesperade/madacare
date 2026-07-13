import {
  Injectable,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hopital, StatutHopital } from '../entities/hopital.entity';
import { User, Role } from '../entities/user.entity';
import { Medecin } from '../entities/medecin.entity';
import { Specialite } from '../entities/specialite.entity';
import { CreerHopitalDto } from './dto/creer-hopital.dto';
import { CreerMedecinDto } from './dto/creer-medecin.dto';
import { AuthService } from '../auth/auth.service';
import { MailService } from '../mail/mail.service';

@Injectable()
export class HopitalService {
  constructor(
    @InjectRepository(Hopital)
    private hopitalRepository: Repository<Hopital>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Medecin)
    private medecinRepository: Repository<Medecin>,
    @InjectRepository(Specialite)
    private specialiteRepository: Repository<Specialite>,
    private authService: AuthService,
    private mailService: MailService,
  ) {}

  async inscrire(dto: CreerHopitalDto): Promise<{ message: string }> {
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
      role: Role.HOPITAL_ADMIN,
      emailVerifie: true,
      actif: true,
    });
    const userSauvegarde = await this.userRepository.save(user);

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

  async creerMedecin(
    hopitalId: string,
    dto: CreerMedecinDto,
  ): Promise<{ message: string }> {
    const hopital = await this.hopitalRepository.findOne({
      where: { id: hopitalId },
      relations: { user: true },
    });
    if (!hopital) {
      throw new BadRequestException('Hôpital introuvable');
    }

    const specialite = await this.specialiteRepository.findOne({
      where: { id: dto.specialiteId },
    });
    if (!specialite) {
      throw new BadRequestException('Spécialité introuvable');
    }

    const emailExistant = await this.userRepository.findOne({
      where: { email: dto.email },
    });
    if (emailExistant) {
      throw new ConflictException('Cet email est déjà utilisé');
    }

    const ordreExistant = await this.medecinRepository.findOne({
      where: { numeroOrdre: dto.numeroOrdre },
    });
    if (ordreExistant) {
      throw new ConflictException('Ce numéro d\'ordre est déjà utilisé');
    }

    // Générer mot de passe temporaire et token activation
    const motDePasseTemporaire = `Mada@${Math.random().toString(36).substring(2, 8).toUpperCase()}!`;
    const tokenActivation = this.authService.genererToken();
    const tokenExpire = new Date();
    tokenExpire.setHours(tokenExpire.getHours() + 72);

    // Créer compte User Médecin
    const motDePasseHache = await this.authService.hacherMotDePasse(
      motDePasseTemporaire,
    );
    const user = this.userRepository.create({
      email: dto.email,
      motDePasse: motDePasseHache,
      role: Role.MEDECIN,
      emailVerifie: false,
      actif: false,
      tokenActivation,
      tokenActivationExpire: tokenExpire,
      doitChangerMotDePasse: true,
    });
    const userSauvegarde = await this.userRepository.save(user);

    // Créer profil Médecin
    const medecin = this.medecinRepository.create({
      nom: dto.nom,
      prenom: dto.prenom,
      numeroOrdre: dto.numeroOrdre,
      user: userSauvegarde,
      hopital,
      specialite,
    });
    await this.medecinRepository.save(medecin);

    // Envoyer email d'activation
    await this.mailService.sendActivationEmail(
      dto.email,
      motDePasseTemporaire,
      tokenActivation,
      hopital.nom,
    );

    return {
      message: `Compte médecin créé avec succès. Un email d'activation a été envoyé à ${dto.email}`,
    };
  }

  async trouverMedecins(hopitalId: string): Promise<Medecin[]> {
    return this.medecinRepository.find({
      where: { hopital: { id: hopitalId } },
      relations: { specialite: true, user: true },
    });
  }
}