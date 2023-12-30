import { Strapi } from '@strapi/strapi';

export default ({ strapi }: { strapi: Strapi }) => ({
  async find(offset: number = 0) {
    const knex = strapi.db.connection;
    const migrations = await knex('strapi_migrations')
      .orderBy('id', 'desc')
      .offset(offset);

    return migrations;
  },
});
