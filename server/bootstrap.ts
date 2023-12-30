import { Strapi } from '@strapi/strapi';
import { runMigrations } from './run-migrations';
import { checkMigrationStatus } from './migration-status';
import {
  setMigrationTable,
  createMigrationsConfigTable,
} from './create-migrations-table';
import { createMigrationsFolderAndSubFolders } from './create-migrations-folders';
import { isNativeStrapiMigrationsEnabled } from './native-strapi-migrations';

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

  const { isMigrationsPending } = await checkMigrationStatus();

  if (isMigrationsPending || isDevelopmentEnv) await runMigrations();
};
