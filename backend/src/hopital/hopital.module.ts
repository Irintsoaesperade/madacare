import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HopitalService } from './hopital.service';
import { HopitalController } from './hopital.controller';
import { Hopital } from '../entities/hopital.entity';
import { User } from '../entities/user.entity';
import { Medecin } from '../entities/medecin.entity';
import { Specialite } from '../entities/specialite.entity';
import { AuthModule } from '../auth/auth.module';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Hopital, User, Medecin, Specialite]),
    AuthModule,
    MailModule,
  ],
  providers: [HopitalService],
  controllers: [HopitalController],
  exports: [HopitalService],
})
export class HopitalModule {}