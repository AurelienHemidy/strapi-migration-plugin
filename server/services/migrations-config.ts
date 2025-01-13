import { Strapi } from '@strapi/strapi';

export default ({ strapi }: { strapi: Strapi }) => ({
  async get() {
    const knex = strapi.db?.connection;
    const [migrationConfig] =
      (await knex?.('cms_migrations_config').where({
        id: 1,
      })) ?? [];

    return {
      ...migrationConfig,
      is_dev: process.env.NODE_ENV === 'development',
    };
  },

  async toggleDryMode() {
    const knex = strapi.db?.connection;

    // Get initial value
    const [migrationConfig] =
      (await knex?.('cms_migrations_config').where({
        id: 1,
      })) ?? [];

    const [migrationConfigUpdate] =
      (await knex?.('cms_migrations_config')
        .update(
          {
            active_dry_mode: !migrationConfig.active_dry_mode,
          },
          ['active_dry_mode']
        )
        .where({
          id: 1,
        })) ?? [];

    return migrationConfigUpdate;
  },
});
