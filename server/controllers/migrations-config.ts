import { Strapi } from '@strapi/strapi';

export default ({ strapi }: { strapi: Strapi }) => ({
  async find(ctx) {
    try {
      return await strapi
        .plugin('migrations')
        .service('migrationsConfig')
        .find();
    } catch (err) {
      ctx.throw(500, err);
    }
  },
  async toggleDryMode(ctx) {
    try {
      return await strapi
        .plugin('migrations')
        .service('migrationsConfig')
        .toggleDryMode();
    } catch (err) {
      ctx.throw(500, err);
    }
  },
});
