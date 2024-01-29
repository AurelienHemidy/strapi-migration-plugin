import { useFetchClient } from '@strapi/helper-plugin';
import { pluginName } from '..';

import { ContentType } from '../types/content-type';

interface UseContentTypesAPIReturn {
  getAll: () => Promise<{ data: ContentType[] }>;
}

export function useContentTypesAPI(): UseContentTypesAPIReturn {
  const { get } = useFetchClient();

  const getAll = async () => {
    return await get(`/${pluginName}/content-types`);
  };

  return {
    getAll,
  };
}
