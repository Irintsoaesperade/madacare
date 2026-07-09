import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User, Role } from '../entities/user.entity';

export async function seedSuperAdmin(dataSource: DataSource): Promise<void> {
  const userRepository = dataSource.getRepository(User);

  const existing = await userRepository.findOne({
    where: { role: Role.SUPER_ADMIN },
  });

  if (existing) {
    console.log('✅ Super Admin déjà existant — seed ignoré');
    return;
  }

  const motDePasse = await bcrypt.hash('SuperAdmin@2026!', 10);

  const superAdmin = userRepository.create({
    email: 'superadmin@madacare.mg',
    motDePasse,
    role: Role.SUPER_ADMIN,
    emailVerifie: true,
    actif: true,
  });

  await userRepository.save(superAdmin);
  console.log('🚀 Super Admin créé avec succès');
  console.log('   Email    : superadmin@madacare.mg');
  console.log('   Password : SuperAdmin@2026!');
}