import 'dotenv/config';
import { DataSource } from 'typeorm';

import { User } from './entities/user.entity';
import { Patient } from './entities/patient.entity';
import { Hopital } from './entities/hopital.entity';
import { Specialite } from './entities/specialite.entity';
import { Medecin } from './entities/medecin.entity';
import { Disponibilite } from './entities/disponibilite.entity';
import { Service } from './entities/service.entity';
import { RendezVous } from './entities/rendez-vous.entity';
import { Consultation } from './entities/consultation.entity';
import { Document } from './entities/document.entity';
import { Ordonnance, LigneOrdonnance } from './entities/ordonnance.entity';
import { DossierMedical } from './entities/dossier-medical.entity';
import { AutorisationDossier } from './entities/autorisation-dossier.entity';
import { AuditLog } from './entities/audit-log.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',

  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),

  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  entities: [
    User,
    Patient,
    Hopital,
    Specialite,
    Medecin,
    Disponibilite,
    Service,
    RendezVous,
    Consultation,
    Document,
    Ordonnance,
    LigneOrdonnance,
    DossierMedical,
    AutorisationDossier,
    AuditLog,
  ],

  migrations: ['src/migrations/*.ts'],

  synchronize: false,
});