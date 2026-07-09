import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { DossierMedical } from './dossier-medical.entity';

@Entity('audit_logs')
export class AuditLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  action: string;

  @Column()
  entite: string;

  @Column()
  entiteId: string;

  @Column({ type: 'jsonb', nullable: true })
  details: Record<string, unknown>;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, { nullable: true })
  user: User;

  @ManyToOne(() => DossierMedical, (dossier) => dossier.auditLogs, {
    nullable: true,
  })
  dossierMedical: DossierMedical;
}