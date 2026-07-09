import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { Consultation } from './consultation.entity';
import { Medecin } from './medecin.entity';

@Entity('ordonnances')
export class Ordonnance {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  numero: string;

  @Column({ type: 'text', nullable: true })
  instructions: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Consultation, (consultation) => consultation.ordonnances)
  consultation: Consultation;

  @ManyToOne(() => Medecin, { eager: false })
  medecin: Medecin;

  @OneToMany(() => LigneOrdonnance, (ligne) => ligne.ordonnance, {
    cascade: true,
  })
  lignes: LigneOrdonnance[];
}

@Entity('lignes_ordonnance')
export class LigneOrdonnance {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  medicament: string;

  @Column()
  dosage: string;

  @Column()
  frequence: string;

  @Column()
  duree: string;

  @Column({ nullable: true })
  instructionsSpecifiques: string;

  @ManyToOne(() => Ordonnance, (ordonnance) => ordonnance.lignes)
  ordonnance: Ordonnance;
}