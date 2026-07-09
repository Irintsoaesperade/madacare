import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Patient } from './patient.entity';
import { Medecin } from './medecin.entity';
import { Hopital } from './hopital.entity';
import { Consultation } from './consultation.entity';

export enum StatutRdv {
  EN_ATTENTE = 'EN_ATTENTE',
  CONFIRME = 'CONFIRME',
  EN_COURS = 'EN_COURS',
  TERMINE = 'TERMINE',
  ANNULE = 'ANNULE',
  ABSENT = 'ABSENT',
}

@Entity('rendez_vous')
export class RendezVous {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamptz' })
  dateHeure: Date;

  @Column()
  motif: string;

  @Column({
    type: 'enum',
    enum: StatutRdv,
    default: StatutRdv.EN_ATTENTE,
  })
  statut: StatutRdv;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Patient, (patient) => patient.rendezVous)
  patient: Patient;

  @ManyToOne(() => Medecin, (medecin) => medecin.rendezVous)
  medecin: Medecin;

  @ManyToOne(() => Hopital, (hopital) => hopital.rendezVous)
  hopital: Hopital;

  @OneToOne(() => Consultation, (consultation) => consultation.rendezVous, {
    nullable: true,
    cascade: true,
  })
  consultation: Consultation;
}