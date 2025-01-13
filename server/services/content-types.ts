import { Strapi } from '@strapi/strapi';
import type { Schema } from '@strapi/types';

export default ({ strapi }: { strapi: Strapi }) => ({
  async get() {
    const singleTypes = Object.values(strapi.contentTypes).filter(
      (contentType: Schema.ContentType) => contentType.kind === 'singleType'
    );

    return singleTypes;
  },
});
