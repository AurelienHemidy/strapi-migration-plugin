import { useFetchClient } from '@strapi/helper-plugin';
import { pluginName } from '..';

interface UseMigrationsAPIReturn {
  getAll: () => Promise<{ data: Migration[] }>;
  runAll: () => Promise<void>;
  remove: (id: number) => Promise<void>;
}

export function useMigrationsAPI(): UseMigrationsAPIReturn {
  const { get, del, post } = useFetchClient();

  const getAll = async () => {
    return await get(`/${pluginName}/migrations`);
  };

  const remove = async (id: number) => {
    return await del(`/${pluginName}/migrations/${id}`);
  };

  const runAll = async () => {
    return await post(`/${pluginName}/migrations/run`);
  };

  return {
    getAll,
    runAll,
    remove,
  };
}
