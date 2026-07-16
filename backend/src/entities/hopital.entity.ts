import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Medecin } from './medecin.entity';
import { Service } from './service.entity';
import { RendezVous } from './rendez-vous.entity';

export enum StatutHopital {
  EN_ATTENTE_VALIDATION = 'EN_ATTENTE_VALIDATION',
  EN_ATTENTE_COMPLEMENT = 'EN_ATTENTE_COMPLEMENT',
  VALIDE = 'VALIDE',
  REJETE = 'REJETE',
  SUSPENDU = 'SUSPENDU',
  INACTIF = 'INACTIF',
}

export enum TypeHopital {
  CSB1 = 'CSB1',
  CSB2 = 'CSB2',
  CHD1 = 'CHD1',
  CHD2 = 'CHD2',
  CHU = 'CHU',
  CLINIQUE_PRIVEE = 'CLINIQUE_PRIVEE',
  HOPITAL_PRIVE = 'HOPITAL_PRIVE',
  POLYCLINIQUE = 'POLYCLINIQUE',
  MATERNITE = 'MATERNITE',
  CABINET_MEDICAL = 'CABINET_MEDICAL',
}

@Entity('hopitaux')
export class Hopital {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // ── Informations principales ──────────────────────────
  @Column()
  nom: string;

  @Column({ type: 'enum', enum: TypeHopital, nullable: true })
  type: TypeHopital;

  @Column()
  adresse: string;

  @Column()
  ville: string;

  @Column()
  region: string;

  @Column({ nullable: true })
  localisation: string;

  // ── Contact ──────────────────────────────────────────
  @Column({ nullable: true })
  telephone: string;

  @Column({ nullable: true })
  telephoneUrgence: string;

  @Column({ nullable: true })
  siteWeb: string;

  // ── Profil public ─────────────────────────────────────
  @Column({ nullable: true })
  logoUrl: string;

  @Column({ nullable: true })
  slogan: string;

  @Column({ nullable: true })
  services: string;

  @Column({ nullable: true })
  heureOuverture: string;

  @Column({ nullable: true })
  heureFermeture: string;

  // ── Direction ─────────────────────────────────────────
  @Column({ nullable: true })
  nomDirecteurMedical: string;

  @Column({ nullable: true })
  cinDirecteur: string;

  // ── Documents légaux ──────────────────────────────────
  @Column({ unique: true, nullable: true })
  numeroAgrement: string;

  @Column({ nullable: true })
  nif: string;

  @Column({ nullable: true })
  stat: string;

  @Column('text', { array: true, default: [] })
  documentsUrl: string[];

  // ── Statut ────────────────────────────────────────────
  @Column({
    type: 'enum',
    enum: StatutHopital,
    default: StatutHopital.EN_ATTENTE_VALIDATION,
  })
  statut: StatutHopital;

  @Column({ nullable: true })
  motifRejet: string;

  @Column({ nullable: true })
  dateValidation: Date;

  @Column({ nullable: true })
  dateRevalidation: Date;

  @Column({ default: 0 })
  nombreSignalements: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // ── Relations ─────────────────────────────────────────
  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @OneToMany(() => Medecin, (medecin) => medecin.hopital)
  medecins: Medecin[];

  @OneToMany(() => Service, (service) => service.hopital)
  servicesList: Service[];

  @OneToMany(() => RendezVous, (rdv) => rdv.hopital)
  rendezVous: RendezVous[];
}