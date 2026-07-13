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
import { DossierMedical } from './dossier-medical.entity';
import { RendezVous } from './rendez-vous.entity';

export enum Sexe {
  M = 'M',
  F = 'F',
}

@Entity('patients')
export class Patient {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nom: string;

  @Column()
  prenom: string;

  @Column({ type: 'date', nullable: true })
  dateNaissance: Date;

  @Column({ nullable: true })
  lieuNaissance: string;

  @Column({ type: 'enum', enum: Sexe, nullable: true })
  sexe: Sexe;


  @Column({ nullable: true })
  telephone: string;

  @Column({ nullable: true })
  adresse: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @OneToOne(() => DossierMedical, (dossier) => dossier.patient, {
    cascade: true,
  })
  dossierMedical: DossierMedical;

  @OneToMany(() => RendezVous, (rdv) => rdv.patient)
  rendezVous: RendezVous[];
}