import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { Hopital } from './hopital.entity';
import { Specialite } from './specialite.entity';

export enum TypeRdv {
  SUR_RDV = 'SUR_RDV',
  SANS_RDV = 'SANS_RDV',
  SUR_ORIENTATION = 'SUR_ORIENTATION',
}

@Entity('services')
export class Service {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nomActe: string;

  @Column({ type: 'enum', enum: TypeRdv, default: TypeRdv.SUR_RDV })
  typeRdv: TypeRdv;

  @Column()
  dureeMinutes: number;

  @ManyToOne(() => Hopital, (hopital) => hopital.services)
  hopital: Hopital;

  @ManyToOne(() => Specialite, (specialite) => specialite.services)
  specialite: Specialite;
}