import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { Medecin } from './medecin.entity';
import { Service } from './service.entity';

@Entity('specialites')
export class Specialite {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  nom: string;

  @Column({ default: true })
  actif: boolean;

  @OneToMany(() => Medecin, (medecin) => medecin.specialite)
  medecins: Medecin[];

  @OneToMany(() => Service, (service) => service.specialite)
  services: Service[];
}