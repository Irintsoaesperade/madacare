import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from '../entities/patient.entity';
import { User } from '../entities/user.entity';
import { DossierMedical } from '../entities/dossier-medical.entity';
import { PatientController } from './patient.controller';
import { PatientService } from './patient.service';
import { AuthModule } from '../auth/auth.module';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Patient, User, DossierMedical]),
    AuthModule,
    MailModule,
  ],
  controllers: [PatientController],
  providers: [PatientService],
  exports: [PatientService],
})
export class PatientModule {}