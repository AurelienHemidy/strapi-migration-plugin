const fs = require('fs');

export async function checkMigrationStatus(): Promise<{
  isMigrationsPending: boolean;
}> {
  const knex = strapi.db.connection;

  const MIGRATION_SCRIPTS_ROOT_FOLDER_PATH =
    process.env.MIGRATION_SCRIPTS_ROOT_FOLDER_PATH ?? 'migrations/scripts';

  // Get all migrations file names inside /migrations-scripts
  const migrationFileNames: string[] = fs.readdirSync(
    MIGRATION_SCRIPTS_ROOT_FOLDER_PATH
  );

  const migrations = await knex('strapi_migrations');

  // If no migration files found, exit
  if (migrationFileNames.length === 0) {
    console.log(`* no migrations files found -> exit *`);

    return {
      isMigrationsPending: false,
    };
  }

  if (migrations.length === migrationFileNames.length) {
    console.log(`* no migrations files to run -> exit *`);

    return {
      isMigrationsPending: false,
    };
  } else {
    await knex('cms_migrations_config')
      .update({
        status: 'pending',
      })
      .where({ id: 1 });
  }

  switch (await migrationGlobalStatus()) {
    case 'pending':
      return {
        isMigrationsPending: true,
      };
    case 'processing':
      await checkIfMigrationHasFailOrComplete();
      return {
        isMigrationsPending: false,
      };
    case 'completed':
      return {
        isMigrationsPending: false,
      };
    case 'fail':
      throw new Error('Migration failed');
    default:
      return {
        isMigrationsPending: false,
      };
  }
}

async function migrationGlobalStatus() {
  const knex = strapi.db.connection;
  const [migrationConfig] = await knex('cms_migrations_config')
    .select('status')
    .where({ id: 1 });
  return migrationConfig.status;
}

const timer = (ms: number) => new Promise(res => setTimeout(res, ms));

async function checkIfMigrationHasFailOrComplete(): Promise<any> {
  const migrationStatus = await migrationGlobalStatus();

  if (migrationStatus === 'fail') {
    throw new Error('Migration failed');
  }

  if (migrationStatus === 'completed') {
    return;
  }

  await timer(1000);

  await checkIfMigrationHasFailOrComplete();
}
