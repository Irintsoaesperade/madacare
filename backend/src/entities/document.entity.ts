import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Consultation } from './consultation.entity';

export enum TypeDocument {
  ANALYSE = 'ANALYSE',
  RADIO = 'RADIO',
  COMPTE_RENDU = 'COMPTE_RENDU',
  AUTRE = 'AUTRE',
}

@Entity('documents')
export class Document {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nom: string;

  @Column({ type: 'enum', enum: TypeDocument, default: TypeDocument.AUTRE })
  type: TypeDocument;

  @Column()
  cheminFichier: string; // URL MinIO

  @Column({ nullable: true })
  taille: number; // en octets

  @CreateDateColumn()
  dateAjout: Date;

  @ManyToOne(() => Consultation, (consultation) => consultation.documents, {
    onDelete: 'CASCADE',
  })
  consultation: Consultation;
}