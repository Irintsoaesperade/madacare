import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { Medecin } from './medecin.entity';

@Entity('disponibilites')
export class Disponibilite {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  jourSemaine: string; // 'lundi', 'mardi', etc.

  @Column({ type: 'time' })
  heureDebut: string;

  @Column({ type: 'time' })
  heureFin: string;

  @Column({ default: false })
  estException: boolean;

  @Column({ type: 'date', nullable: true })
  dateException: Date; // utilisé si estException = true

  @ManyToOne(() => Medecin, (medecin) => medecin.disponibilites, {
    onDelete: 'CASCADE',
  })
  medecin: Medecin;
}