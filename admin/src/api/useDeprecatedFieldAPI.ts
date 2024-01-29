import { useFetchClient } from '@strapi/helper-plugin';
import { pluginName } from '..';

interface UseDeprecatedFieldAPIReturn {
  getAll: () => Promise<{ data: DeprecatedField[] }>;
  toggleVisibility: (id: string) => Promise<void>;
  removeFromJson: (id: string) => Promise<void>;
  removeFromContentType: (id: string) => Promise<void>;
  create: (contentType: string, attribute: string) => Promise<void>;
}

export function useDeprecatedFieldAPI(): UseDeprecatedFieldAPIReturn {
  const { get, put, del, post } = useFetchClient();

  const getAll = async () => {
    return await get(`/${pluginName}/deprecated-fields`);
  };

  const toggleVisibility = async (id: string) => {
    return await put(
      `/${pluginName}/deprecated-fields/toggle-visibility/${id}`
    );
  };

  const removeFromJson = async (id: string) => {
    return await del(`/${pluginName}/deprecated-fields/${id}?target=json`);
  };

  const removeFromContentType = async (id: string) => {
    return await del(
      `/${pluginName}/deprecated-fields/${id}?target=contentType`
    );
  };

  const create = async (contentType: string, attribute: string) => {
    return await post(`/${pluginName}/deprecated-fields`, {
      contentType,
      attribute,
    });
  };

  return {
    getAll,
    toggleVisibility,
    removeFromJson,
    removeFromContentType,
    create,
  };
}
