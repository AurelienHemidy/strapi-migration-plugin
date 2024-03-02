import { Strapi } from '@strapi/strapi';
import { runMigrations } from '../runMigrations';

export default ({ strapi }: { strapi: Strapi }) => ({
  async get(offset: number = 0) {
    const knex = strapi.db.connection;
    const migrations = await knex('strapi_migrations')
      .orderBy('id', 'desc')
      .offset(offset);

    return migrations;
  },
  async run() {
    console.log('Running migrations...');

    await runMigrations();

    return { message: 'Migrations done' };
  },
  async delete(migrationId: number) {
    const knex = strapi.db.connection;
    const deletedMigration = await knex('strapi_migrations')
      .where('id', migrationId)
      .del();

    return deletedMigration;
  },
});
