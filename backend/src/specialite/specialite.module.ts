import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpecialiteService } from './specialite.service';
import { SpecialiteController } from './specialite.controller';
import { Specialite } from '../entities/specialite.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Specialite])],
  providers: [SpecialiteService],
  controllers: [SpecialiteController],
  exports: [SpecialiteService],
})
export class SpecialiteModule {}