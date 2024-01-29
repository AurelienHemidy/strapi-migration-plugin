import { useEffect, useState } from 'react';

import { useMigrationsAPI } from '../api/useMigrationsAPI';

import { useNotification } from '@strapi/helper-plugin';

interface UseMigrationsReturn {
  migrations: Migration[];
  isLoading: boolean;
  error: Error | null;
  fetchMigrations: () => Promise<void>;
  deleteMigration: (id: number) => Promise<void>;
  runMigrations: () => void;
  migrationsSucceeded: Migration[];
  migrationsFailed: Migration[];
}

export function useMigrations(): UseMigrationsReturn {
  const toggleNotification = useNotification();

  const { getAll, runAll, remove } = useMigrationsAPI();

  const [migrations, setMigrations] = useState<Migration[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchMigrations = async () => {
    setIsLoading(true);
    try {
      const { data } = await getAll();

      setMigrations(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err);
      }
    }

    setIsLoading(false);
  };

  const deleteMigration = async (id: number) => {
    try {
      await remove(id);

      await fetchMigrations();
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

  const runMigrations = async () => {
    try {
      await runAll();

      await fetchMigrations();
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

  const migrationsSucceeded = (migrations ?? []).filter(
    migration => migration.status === 'success'
  );
  const migrationsFailed = (migrations ?? []).filter(
    migration => migration.status === 'fail'
  );

  useEffect(() => {
    fetchMigrations();
  }, []);

  return {
    migrations,
    isLoading,
    error,
    fetchMigrations,
    deleteMigration,
    runMigrations,
    migrationsSucceeded,
    migrationsFailed,
  };
}
