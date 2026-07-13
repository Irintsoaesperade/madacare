import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Patient } from './patient.entity';
import { Medecin } from './medecin.entity';
import { Hopital } from './hopital.entity';

export enum Role {
  PATIENT = 'PATIENT',
  MEDECIN = 'MEDECIN',
  HOPITAL_ADMIN = 'HOPITAL_ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  motDePasse: string;

  @Column({ type: 'enum', enum: Role })
  role: Role;

  @Column({ default: false })
  emailVerifie: boolean;

  @Column({ type: 'varchar', nullable: true })
  @Exclude()
  tokenVerification: string | null;

  @Column({ type: 'varchar', nullable: true })
  @Exclude()
  tokenActivation: string | null;

  @Column({ type: 'timestamp', nullable: true })
  @Exclude()
  tokenActivationExpire: Date | null;

  @Column({ default: false })
  doitChangerMotDePasse: boolean;

  @Column({ default: true })
  actif: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Patient, (patient) => patient.user)
  patient: Patient;

  @OneToOne(() => Medecin, (medecin) => medecin.user)
  medecin: Medecin;

  @OneToOne(() => Hopital, (hopital) => hopital.user)
  hopital: Hopital;
}