import { Strapi } from '@strapi/strapi';

export default ({ strapi }: { strapi: Strapi }) => ({
  async get(ctx) {
    try {
      return await strapi
        .plugin('strapi-plugin-migration')
        .service('deprecatedFields')
        .get();
    } catch (err) {
      ctx.throw(500, err);
    }
  },
  async delete(ctx) {
    const { id } = ctx.params;

    const { target } = ctx.query;

    try {
      return await strapi
        .plugin('strapi-plugin-migration')
        .service('deprecatedFields')
        .delete(id, target);
    } catch (err) {
      ctx.throw(500, err);
    }
  },
  async toggleVisibility(ctx) {
    const { id } = ctx.params;

    try {
      return await strapi
        .plugin('strapi-plugin-migration')
        .service('deprecatedFields')
        .toggleVisibility(id);
    } catch (err) {
      ctx.throw(500, err);
    }
  },
  async create(ctx) {
    const { contentType, attribute } = ctx.request.body;

    try {
      return await strapi
        .plugin('strapi-plugin-migration')
        .service('deprecatedFields')
        .create(contentType, attribute);
    } catch (err) {
      ctx.throw(500, err);
    }
  },
});
