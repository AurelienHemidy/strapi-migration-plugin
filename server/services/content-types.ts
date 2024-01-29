import { ContentTypeSchema, Strapi } from '@strapi/strapi';

const fsPromises = require('fs').promises;

export default ({ strapi }: { strapi: Strapi }) => ({
  async get() {
    const singleTypes = Object.values<ContentTypeSchema>(
      strapi.contentTypes
    ).filter(contentType => contentType.kind === 'singleType');

    return singleTypes;
  },
});
