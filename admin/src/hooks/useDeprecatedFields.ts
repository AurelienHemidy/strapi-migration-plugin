import { useEffect, useState } from 'react';
import { useDeprecatedFieldAPI } from '../api/useDeprecatedFieldAPI';

import {
  useNotification,
  useAutoReloadOverlayBlocker,
} from '@strapi/helper-plugin';

interface UseDeprecatedFieldsReturn {
  deprecatedFields: DeprecatedField[];
  error: Error | null;
  fetchDeprecatedFields: () => Promise<void>;
  deleteDeprecatedField: (id: string) => Promise<void>;
  softDeleteDeprecatedField: (id: string) => Promise<void>;
  toggleDeprecatedFieldVisibility: (id: string) => Promise<void>;
  addDeprecatedField: (contentType?: string, field?: string) => void;
  isAddDeprecatedFieldModalOpen: boolean;
  setIsAddDeprecatedFieldModalOpen: (value: boolean) => void;
}

export function useDeprecatedFields(): UseDeprecatedFieldsReturn {
  const toggleNotification = useNotification();
  const { lockAppWithAutoreload, unlockAppWithAutoreload } =
    useAutoReloadOverlayBlocker();

  const {
    getAll,
    create,
    removeFromJson,
    removeFromContentType,
    toggleVisibility,
  } = useDeprecatedFieldAPI();

  const [deprecatedFields, setDeprecatedFields] = useState<DeprecatedField[]>(
    []
  );
  const [error, setError] = useState<Error | null>(null);
  useState(false);
  const [isAddDeprecatedFieldModalOpen, setIsAddDeprecatedFieldModalOpen] =
    useState(false);

  const fetchDeprecatedFields = async () => {
    try {
      const { data } = await getAll();

      setDeprecatedFields(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err);
      }
    }
  };

  const deleteDeprecatedField = async (id: string) => {
    lockAppWithAutoreload({
      title: 'Soft deleting field',
      description: 'Please wait...',
      icon: 'reload',
    });

    try {
      await removeFromContentType(id);

      await removeFromJson(id);

      await fetchDeprecatedFields();

      const preventDevServerFromCrashingTimeOut = setTimeout(() => {
        unlockAppWithAutoreload();
        clearTimeout(preventDevServerFromCrashingTimeOut);
      }, 4000);
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

  const softDeleteDeprecatedField = async (id: string) => {
    lockAppWithAutoreload({
      title: 'Soft deleting field',
      description: 'Please wait...',
      icon: 'reload',
    });

    try {
      await removeFromJson(id);

      await fetchDeprecatedFields();

      const preventDevServerFromCrashingTimeOut = setTimeout(() => {
        unlockAppWithAutoreload();
        clearTimeout(preventDevServerFromCrashingTimeOut);
      }, 4000);
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

  const toggleDeprecatedFieldVisibility = async (id: string) => {
    lockAppWithAutoreload({
      title: "Changing field's visibility",
      description: 'Please wait...',
      icon: 'reload',
    });

    try {
      await toggleVisibility(id);

      await fetchDeprecatedFields();

      const preventDevServerFromCrashingTimeOut = setTimeout(() => {
        unlockAppWithAutoreload();
        clearTimeout(preventDevServerFromCrashingTimeOut);
      }, 4000);
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

  const addDeprecatedField = async (
    contentType?: string,
    attribute?: string
  ) => {
    if (!contentType || !attribute) return;

    lockAppWithAutoreload({
      title: "Changing field's visibility",
      description: 'Please wait...',
      icon: 'reload',
    });

    try {
      await create(contentType, attribute);

      await fetchDeprecatedFields();

      setIsAddDeprecatedFieldModalOpen(false);

      const preventDevServerFromCrashingTimeOut = setTimeout(() => {
        unlockAppWithAutoreload();
        clearTimeout(preventDevServerFromCrashingTimeOut);
      }, 4000);
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
    fetchDeprecatedFields();
  }, []);

  return {
    deprecatedFields,
    error,
    fetchDeprecatedFields,
    deleteDeprecatedField,
    softDeleteDeprecatedField,
    toggleDeprecatedFieldVisibility,
    addDeprecatedField,
    isAddDeprecatedFieldModalOpen,
    setIsAddDeprecatedFieldModalOpen,
  };
}
