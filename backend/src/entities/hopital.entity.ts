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

@Entity('hopitaux')
export class Hopital {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nom: string;

  @Column()
  adresse: string;

  @Column()
  ville: string;

  @Column()
  region: string;

  @Column({ unique: true, nullable: true })
  numeroAgrement: string;

  @Column({ nullable: true })
  nif: string;

  @Column({ nullable: true })
  stat: string;

  @Column({ nullable: true })
  nomDirecteurMedical: string;

  @Column({ nullable: true })
  cinDirecteur: string;

  @Column({ nullable: true })
  telephone: string;

  @Column({ nullable: true })
  heureOuverture: string;

  @Column({ nullable: true })
  heureFermeture: string;

  @Column('text', { array: true, default: [] })
  documentsUrl: string[];

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

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @OneToMany(() => Medecin, (medecin) => medecin.hopital)
  medecins: Medecin[];

  @OneToMany(() => Service, (service) => service.hopital)
  services: Service[];

  @OneToMany(() => RendezVous, (rdv) => rdv.hopital)
  rendezVous: RendezVous[];
}