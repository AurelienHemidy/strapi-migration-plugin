import { Strapi } from '@strapi/strapi';

export default ({ strapi }: { strapi: Strapi }) => ({
  async get(ctx) {
    try {
      return await strapi
        .plugin('strapi-plugin-migration')
        .service('contentTypes')
        .get();
    } catch (err) {
      ctx.throw(500, err);
    }
  },
});
