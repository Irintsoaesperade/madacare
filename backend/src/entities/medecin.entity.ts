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
import { User } from './user.entity';
import { Hopital } from './hopital.entity';
import { Specialite } from './specialite.entity';
import { Disponibilite } from './disponibilite.entity';
import { RendezVous } from './rendez-vous.entity';
import { Consultation } from './consultation.entity';
import { AutorisationDossier } from './autorisation-dossier.entity';

@Entity('medecins')
export class Medecin {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nom: string;

  @Column()
  prenom: string;

  @Column({ unique: true })
  numeroOrdre: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => User, (user) => user.medecin)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Hopital, (hopital) => hopital.medecins)
  hopital: Hopital;

  @ManyToOne(() => Specialite, (specialite) => specialite.medecins)
  specialite: Specialite;

  @OneToMany(() => Disponibilite, (dispo) => dispo.medecin, {
    cascade: true,
  })
  disponibilites: Disponibilite[];

  @OneToMany(() => RendezVous, (rdv) => rdv.medecin)
  rendezVous: RendezVous[];

  @OneToMany(() => Consultation, (consultation) => consultation.medecin)
  consultations: Consultation[];

  @OneToMany(() => AutorisationDossier, (autorisation) => autorisation.medecin)
  autorisations: AutorisationDossier[];
}