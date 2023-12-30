import { Strapi } from '@strapi/strapi';

export default ({ strapi }: { strapi: Strapi }) => ({
  async find(ctx) {
    const { offset } = ctx.request.query;
    try {
      return await strapi
        .plugin('migrations')
        .service('migrations')
        .find(offset);
    } catch (err) {
      ctx.throw(500, err);
    }
  },
});
