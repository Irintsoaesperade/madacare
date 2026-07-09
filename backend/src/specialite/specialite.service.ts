import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Specialite } from '../entities/specialite.entity';
import { CreerSpecialiteDto } from './dto/creer-specialite.dto';

@Injectable()
export class SpecialiteService {
  constructor(
    @InjectRepository(Specialite)
    private specialiteRepository: Repository<Specialite>,
  ) {}

  async creer(dto: CreerSpecialiteDto): Promise<Specialite> {
    const existante = await this.specialiteRepository.findOne({
      where: { nom: dto.nom },
    });
    if (existante) {
      throw new ConflictException('Cette spécialité existe déjà');
    }
    const specialite = this.specialiteRepository.create({ nom: dto.nom });
    return this.specialiteRepository.save(specialite);
  }

  async trouverTous(): Promise<Specialite[]> {
    return this.specialiteRepository.find({
      where: { actif: true },
      order: { nom: 'ASC' },
    });
  }

  async trouverParId(id: string): Promise<Specialite> {
    const specialite = await this.specialiteRepository.findOne({
      where: { id },
    });
    if (!specialite) {
      throw new NotFoundException('Spécialité introuvable');
    }
    return specialite;
  }

  async mettreAJour(id: string, dto: CreerSpecialiteDto): Promise<Specialite> {
    const specialite = await this.trouverParId(id);
    specialite.nom = dto.nom;
    return this.specialiteRepository.save(specialite);
  }

  async desactiver(id: string): Promise<{ message: string }> {
    const specialite = await this.trouverParId(id);
    specialite.actif = false;
    await this.specialiteRepository.save(specialite);
    return { message: 'Spécialité désactivée avec succès' };
  }
}