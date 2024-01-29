import { useEffect, useState } from 'react';

import { useContentTypesAPI } from '../api/useContentTypesAPI';
import { ContentType } from '../types/content-type';

interface UseContentTypesReturn {
  contentTypes: ContentType[] | undefined;
  error: Error | null;
}

export function useContenTypes(): UseContentTypesReturn {
  const { getAll } = useContentTypesAPI();

  const [contentTypes, setContentTypes] = useState<ContentType[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchContentTypes = async () => {
    if (!isLoading) setIsLoading(true);

    try {
      const { data } = await getAll();

      setContentTypes(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err);
      }
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchContentTypes();
  }, []);

  return {
    contentTypes: contentTypes,
    error,
  };
}
