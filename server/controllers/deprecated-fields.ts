import { Strapi } from '@strapi/strapi';

export default ({ strapi }: { strapi: Strapi }) => ({
  async find(ctx) {
    try {
      return await strapi
        .plugin('migrations')
        .service('deprecatedFields')
        .find();
    } catch (err) {
      ctx.throw(500, err);
    }
  },
});
