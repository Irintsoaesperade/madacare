import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
  JoinColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Patient } from './patient.entity';
import { AutorisationDossier } from './autorisation-dossier.entity';
import { AuditLog } from './audit-log.entity';

@Entity('dossiers_medicaux')
export class DossierMedical {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  groupeSanguin: string;

  @Column('text', { array: true, default: [] })
  allergies: string[];

  @Column('text', { array: true, default: [] })
  maladiesChroniques: string[];

  @Column('text', { array: true, default: [] })
  medicamentsEnCours: string[];

  @Column({ nullable: true })
  contactUrgenceNom: string;

  @Column({ nullable: true })
  contactUrgenceTelephone: string;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Patient, (patient) => patient.dossierMedical)
  @JoinColumn()
  patient: Patient;

  @OneToMany(
    () => AutorisationDossier,
    (autorisation) => autorisation.dossierMedical,
    { cascade: true },
  )
  autorisations: AutorisationDossier[];

  @OneToMany(() => AuditLog, (log) => log.dossierMedical)
  auditLogs: AuditLog[];
}