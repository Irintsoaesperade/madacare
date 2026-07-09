import { DataSource } from 'typeorm';
import { Specialite } from '../entities/specialite.entity';

const SPECIALITES = [
  'Médecine générale',
  'Cardiologie',
  'Pédiatrie',
  'Neurologie',
  'Gynécologie',
  'Dermatologie',
  'Ophtalmologie',
  'Chirurgie',
  'Radiologie',
  'Pneumologie',
  'Orthopédie',
  'Urologie',
  'ORL',
  'Psychiatrie',
  'Endocrinologie',
];

export async function seedSpecialites(dataSource: DataSource): Promise<void> {
  const repo = dataSource.getRepository(Specialite);
  const existantes = await repo.find();
  if (existantes.length > 0) {
    console.log('✅ Spécialités déjà existantes — seed ignoré');
    return;
  }
  for (const nom of SPECIALITES) {
    await repo.save(repo.create({ nom }));
  }
  console.log(`🏥 ${SPECIALITES.length} spécialités créées avec succès`);
}