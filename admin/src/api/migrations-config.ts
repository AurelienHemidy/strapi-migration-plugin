import { request } from '@strapi/helper-plugin';

export const migrationConfigRequest = {
  getConfig: async () => {
    return await request('/migrations/config', {
      method: 'GET',
    });
  },
  toggleDryMode: async () => {
    return await request('/migrations/config/toggle-dry-mode', {
      method: 'PATCH',
    });
  },
};
