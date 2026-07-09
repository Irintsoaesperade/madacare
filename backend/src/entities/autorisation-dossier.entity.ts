import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DossierMedical } from './dossier-medical.entity';
import { Medecin } from './medecin.entity';

export enum TypeAcces {
  STANDARD = 'STANDARD',
  URGENCE = 'URGENCE',
}

export enum StatutAutorisation {
  EN_ATTENTE = 'EN_ATTENTE',
  ACCORDE = 'ACCORDE',
  REFUSE = 'REFUSE',
  REVOQUE = 'REVOQUE',
}

@Entity('autorisations_dossier')
export class AutorisationDossier {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: TypeAcces, default: TypeAcces.STANDARD })
  typeAcces: TypeAcces;

  @Column({
    type: 'enum',
    enum: StatutAutorisation,
    default: StatutAutorisation.EN_ATTENTE,
  })
  statut: StatutAutorisation;

  @Column({ nullable: true })
  accordeLe: Date;

  @Column({ nullable: true })
  expireLe: Date;

  @Column({ nullable: true })
  revoqueLe: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => DossierMedical, (dossier) => dossier.autorisations)
  dossierMedical: DossierMedical;

  @ManyToOne(() => Medecin, (medecin) => medecin.autorisations)
  medecin: Medecin;
}