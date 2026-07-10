import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Medecin } from '../entities/medecin.entity';
import { RendezVous, StatutRdv } from '../entities/rendez-vous.entity';

const DUREE_CRENEAU_MIN = 30; // durée fixe MVP

const JOURS = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];

@Injectable()
export class MedecinService {
  constructor(
    @InjectRepository(Medecin)
    private medecinRepository: Repository<Medecin>,
    @InjectRepository(RendezVous)
    private rendezVousRepository: Repository<RendezVous>,
  ) {}

  async trouverParHopital(hopitalId: string): Promise<Medecin[]> {
    return this.medecinRepository.find({
      where: { hopital: { id: hopitalId } },
      relations: { specialite: true, hopital: true },
    });
  }

  async trouverParId(id: string): Promise<Medecin> {
    const medecin = await this.medecinRepository.findOne({
      where: { id },
      relations: { specialite: true, hopital: true, disponibilites: true },
    });
    if (!medecin) {
      throw new BadRequestException('Médecin introuvable');
    }
    return medecin;
  }

  async creneauxDisponibles(medecinId: string, dateStr: string): Promise<string[]> {
    const medecin = await this.trouverParId(medecinId);
    const date = new Date(dateStr);
    const jourSemaine = JOURS[date.getDay()];

    // 1. Trouver la disponibilité applicable (exception prioritaire sur récurrente)
    const exception = medecin.disponibilites.find(
      (d) => d.estException && d.dateException?.toISOString().slice(0, 10) === dateStr,
    );
    const recurrente = medecin.disponibilites.find(
      (d) => !d.estException && d.jourSemaine === jourSemaine,
    );
    const dispo = exception ?? recurrente;
    if (!dispo) return []; // médecin ne travaille pas ce jour-là

    // 2. Générer tous les créneaux possibles entre heureDebut et heureFin
    const creneaux: string[] = [];
    const [hDebut, mDebut] = dispo.heureDebut.split(':').map(Number);
    const [hFin, mFin] = dispo.heureFin.split(':').map(Number);
    let curseur = new Date(date);
    curseur.setHours(hDebut, mDebut, 0, 0);
    const fin = new Date(date);
    fin.setHours(hFin, mFin, 0, 0);

    while (curseur < fin) {
      creneaux.push(curseur.toTimeString().slice(0, 5));
      curseur = new Date(curseur.getTime() + DUREE_CRENEAU_MIN * 60000);
    }

    // 3. Retirer les créneaux déjà pris (rendez-vous non annulés ce jour-là)
    const debutJour = new Date(dateStr);
    debutJour.setHours(0, 0, 0, 0);
    const finJour = new Date(dateStr);
    finJour.setHours(23, 59, 59, 999);

    const rdvExistants = await this.rendezVousRepository.find({
      where: {
        medecin: { id: medecinId },
        dateHeure: Between(debutJour, finJour),
      },
    });
    const heuresPrises = rdvExistants
      .filter((r) => r.statut !== StatutRdv.ANNULE)
      .map((r) => r.dateHeure.toTimeString().slice(0, 5));

    return creneaux.filter((c) => !heuresPrises.includes(c));
  }
}