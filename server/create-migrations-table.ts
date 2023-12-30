/**
 * Set up the 'strapi_migrations' table
 */
export async function setMigrationTable() {
  const knex = strapi.db.connection;

  console.log(`* setting up strapi_migrations table *`);

  await knex.schema
    .hasColumn('strapi_migrations', 'status')
    .then(async function (exists) {
      if (!exists) {
        await knex.schema.alterTable('strapi_migrations', table => {
          table.string('status');
        });
      }
    });

  await knex.schema
    .hasColumn('strapi_migrations', 'migrated_at')
    .then(async function (exists) {
      if (!exists) {
        await knex.schema.alterTable('strapi_migrations', table => {
          table.datetime('migrated_at');
        });
      }
    });
}

/**
 * Create the 'cms_migrations_config' table is it doesn't exist
 */
export async function createMigrationsConfigTable() {
  const knex = strapi.db.connection;

  const isDevelopmentEnv = process.env.NODE_ENV === 'development';

  // This table will be dropped if a configuration:restore command is run
  // But it's not an issue as we only need it during process lifetime
  await knex.schema
    .hasTable('cms_migrations_config')
    .then(async function (exists) {
      if (!exists) {
        console.log(`* creating cms_migrations_config table *`);

        await knex.schema.createTable(
          'cms_migrations_config',
          function (table) {
            table.increments('id').primary();
            table.boolean('active_dry_mode');
            table.string('status');
          }
        );

        // Set active_dry_mode default value to "true"
        return knex('cms_migrations_config').insert({
          active_dry_mode: isDevelopmentEnv ? true : false,
        });
      }
    });
}
