import { Strapi } from '@strapi/strapi';
import { runMigrations } from './runMigrations';
import {
  setMigrationTable,
  createMigrationsConfigTable,
} from './createMigrationTable';
import { createMigrationsFolderAndSubFolders } from './createMigrationsFolders';
import { isNativeStrapiMigrationsEnabled } from './nativeStrapiMigrations';
import { checkForMigrationsToProcess } from './checkForMigrations';
import { migrationsProcess } from './migrationProcess';

export default async ({ strapi }: { strapi: Strapi }) => {
  // bootstrap phase
  const isDevelopmentEnv = process.env.NODE_ENV === 'development';

  if (isNativeStrapiMigrationsEnabled()) {
    throw new Error(
      '* ⚠️ Be careful, Native Strapi migrations are used, it could cause conflicts and undesired behavior *'
    );
  }

  await createMigrationsFolderAndSubFolders();
  await setMigrationTable();
  await createMigrationsConfigTable();

  const isMigrationsToProcess = await checkForMigrationsToProcess();

  if (!isMigrationsToProcess) return;

  const { canProcessMigrations } = await migrationsProcess();

  if (canProcessMigrations || isDevelopmentEnv) await runMigrations();
};
