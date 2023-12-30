import { request } from '@strapi/helper-plugin';

export const migrationRequest = {
  getAllMigrations: async (offset: number = 0) => {
    return await request('/migrations/find', {
      method: 'GET',
      params: {
        offset: offset,
      },
    });
  },
};
