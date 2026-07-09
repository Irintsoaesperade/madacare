import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
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
import { Ordonnance } from './entities/ordonnance.entity';
import { LigneOrdonnance } from './entities/ordonnance.entity';
import { DossierMedical } from './entities/dossier-medical.entity';
import { AutorisationDossier } from './entities/autorisation-dossier.entity';
import { AuditLog } from './entities/audit-log.entity';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MailModule } from './mail/mail.module';
import { HopitalModule } from './hopital/hopital.module';
import { SpecialiteModule } from './specialite/specialite.module';
import { PatientModule } from './patient/patient.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USER'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME'),
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
        synchronize: false,
        logging: true,
      }),
    }),
    AuthModule,
    UserModule,
    MailModule,
    HopitalModule,
    SpecialiteModule,
    PatientModule,
  ],
})
export class AppModule {}