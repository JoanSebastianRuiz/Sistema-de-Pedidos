import { seedAdmin } from './runners/admin.seed';

async function seed() {
  try {
    console.log('🌱 Seeding database...');

    await seedAdmin();

    console.log('✅ Seed completed');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed');
    console.error(error);

    process.exit(1);
  }
}

seed();
