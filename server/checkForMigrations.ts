const fs = require('fs');

/**
 * Check if there are migrations that are not processed yet.
 * @returns {boolean} True if there are migrations that aren't processed yet, false otherwise.
 */
export async function checkForMigrationsToProcess(): Promise<boolean> {
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

    return false;
  }
  if (migrations.length === migrationFileNames.length) {
    console.log(`* no migrations files to run -> exit *`);

    return false;
  }

  return true;
}
