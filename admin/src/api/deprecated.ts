import { request } from '@strapi/helper-plugin';

export const deprecatedFieldsRequest = {
  getAllDeprecatedFields: async () => {
    return await request('/migrations/deprecated-fields/find', {
      method: 'GET',
    });
  },
};
