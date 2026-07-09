import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  ManyToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RendezVous } from './rendez-vous.entity';
import { Medecin } from './medecin.entity';
import { Patient } from './patient.entity';
import { Ordonnance } from './ordonnance.entity';
import { Document } from './document.entity';

@Entity('consultations')
export class Consultation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: true })
  compteRendu: string;

  @Column({ type: 'text', nullable: true })
  diagnostic: string;

  @Column({ type: 'text', nullable: true })
  recommandations: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => RendezVous, (rdv) => rdv.consultation)
  @JoinColumn()
  rendezVous: RendezVous;

  @ManyToOne(() => Medecin, (medecin) => medecin.consultations)
  medecin: Medecin;

  @ManyToOne(() => Patient, { eager: false })
  patient: Patient;

  @OneToMany(() => Ordonnance, (ordonnance) => ordonnance.consultation, {
    cascade: true,
  })
  ordonnances: Ordonnance[];

  @OneToMany(() => Document, (document) => document.consultation, {
    cascade: true,
  })
  documents: Document[];
}