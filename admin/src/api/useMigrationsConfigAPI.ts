import { useFetchClient } from '@strapi/helper-plugin';
import { pluginName } from '..';

interface UseMigrationsConfigAPIReturn {
  getAll: () => Promise<{ data: MigrationConfig }>;
  toggleDryMode: () => Promise<void>;
}

export function useMigrationsConfigAPI(): UseMigrationsConfigAPIReturn {
  const { get, patch } = useFetchClient();

  const getAll = async () => {
    return await get(`/${pluginName}/migrations-config`, {
      method: 'GET',
    });
  };

  const toggleDryMode = async () => {
    return await patch(`/${pluginName}/migrations-config/toggle-dry-mode`, {
      method: 'PATCH',
    });
  };

  return {
    getAll,
    toggleDryMode,
  };
}
