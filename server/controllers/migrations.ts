import { Strapi } from '@strapi/strapi';

export default ({ strapi }: { strapi: Strapi }) => ({
  async get(ctx) {
    const { offset } = ctx.request.query;
    try {
      return await strapi
        .plugin('strapi-plugin-migration')
        .service('migrations')
        .get(offset);
    } catch (err) {
      ctx.throw(500, err);
    }
  },
  async delete(ctx) {
    const { id } = ctx.params;
    try {
      return await strapi
        .plugin('strapi-plugin-migration')
        .service('migrations')
        .delete(id);
    } catch (err) {
      ctx.throw(500, err);
    }
  },
  async run(ctx) {
    try {
      return await strapi
        .plugin('strapi-plugin-migration')
        .service('migrations')
        .run();
    } catch (err) {
      ctx.throw(500, err);
    }
  },
});
