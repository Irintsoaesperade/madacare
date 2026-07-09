import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HopitalService } from './hopital.service';
import { HopitalController } from './hopital.controller';
import { Hopital } from '../entities/hopital.entity';
import { User } from '../entities/user.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Hopital, User]),
    AuthModule,
  ],
  providers: [HopitalService],
  controllers: [HopitalController],
  exports: [HopitalService],
})
export class HopitalModule {}