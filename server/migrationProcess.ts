import { checkForMigrationsToProcess } from './checkForMigrations';
import { MigrationGlobalStatus } from './types/migrationGlobalStatus';
import { delay } from './utils/delay';

/**
 * When a docker node is starting, it will check if there are migrations to process
 * In the case there are multiple replicas, only one will process the migrations
 */
export async function migrationsProcess(): Promise<{
  canProcessMigrations: boolean;
}> {
  // If there are migrations to process and the status is not pending, set the status to pending
  if (
    (await checkForMigrationsToProcess()) &&
    (await getMigrationsGlobalStatus()) === 'not_started'
  ) {
    await updateMigrationsGlobalStatus('pending');
  }

  const migrationsGlobalStatus = await getMigrationsGlobalStatus();

  switch (true) {
    case migrationsGlobalStatus === 'pending':
      await updateMigrationsGlobalStatus('processing');
      return {
        canProcessMigrations: true,
      };
    case migrationsGlobalStatus === 'processing':
      await checkIfMigrationHasFailOrComplete();
      return {
        canProcessMigrations: false,
      };
    case migrationsGlobalStatus === 'completed':
      return {
        canProcessMigrations: false,
      };
    case migrationsGlobalStatus === 'fail':
      throw new Error('Migration failed');
    default:
      return {
        canProcessMigrations: false,
      };
  }
}

/**
 * Get the global migrations status shared between all the replicas
 */
async function getMigrationsGlobalStatus(): Promise<MigrationGlobalStatus> {
  const knex = strapi.db.connection;
  const [migrationConfig] = await knex('cms_migrations_config')
    .select('status')
    .where({ id: 1 });
  return migrationConfig.status;
}

/**
 * Update the global migrations status shared between all the replicas
 */
export async function updateMigrationsGlobalStatus(
  status: MigrationGlobalStatus
) {
  const knex = strapi.db.connection;

  await knex('cms_migrations_config')
    .update({
      status: status,
    })
    .where({ id: 1 });
}

/**
 * Check every second if the migrations have failed or completed on the node that is processing them,
 * to kill the current replica if the migrations have failed
 */
async function checkIfMigrationHasFailOrComplete(): Promise<any> {
  const migrationStatus = await getMigrationsGlobalStatus();

  if (migrationStatus === 'fail') {
    throw new Error('Migration failed');
  }

  if (migrationStatus === 'completed') {
    return;
  }

  await delay(1000);

  await checkIfMigrationHasFailOrComplete();
}
