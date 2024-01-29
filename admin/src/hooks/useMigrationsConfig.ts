import { useEffect, useState } from 'react';

import { useNotification } from '@strapi/helper-plugin';
import { useMigrationsConfigAPI } from '../api/useMigrationsConfigAPI';

interface UseMigrationsConfigReturn {
  migrationsConfig: MigrationConfig | undefined;
  isLoading: boolean;
  error: Error | null;
  isDevelopmentEnv: boolean;
  toggleDryMode: () => Promise<void>;
}

export function useMigrationsConfig(): UseMigrationsConfigReturn {
  const toggleNotification = useNotification();

  const { getAll, toggleDryMode: toggleMigrationsDryMode } =
    useMigrationsConfigAPI();

  const [migrationsConfig, setMigrationsConfig] = useState<MigrationConfig>();
  const [isDevelopmentEnv, setIsDevelopmentEnv] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchMigrationsConfig = async () => {
    if (!isLoading) setIsLoading(true);

    try {
      const { data } = await getAll();

      setMigrationsConfig(data);
      setIsDevelopmentEnv(data.is_dev);
    } catch (err) {
      if (err instanceof Error) {
        setError(err);
      }
    }

    setIsLoading(false);
  };

  const toggleDryMode = async () => {
    try {
      await toggleMigrationsDryMode();

      await fetchMigrationsConfig();
    } catch (err) {
      if (err instanceof Error) {
        toggleNotification({
          type: 'warning',
          message: err.message,
          title: err.name,
        });
      }
    }
  };

  useEffect(() => {
    fetchMigrationsConfig();
  }, []);

  return {
    migrationsConfig,
    isLoading,
    error,
    isDevelopmentEnv,
    toggleDryMode,
  };
}
