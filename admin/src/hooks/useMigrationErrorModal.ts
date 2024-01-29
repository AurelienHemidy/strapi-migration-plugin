import { useState } from 'react';

interface UseMigrationError {
  isErrorModalVisible: boolean;
  setIsErrorModalVisible: (value: boolean) => void;
  currentError: MigrationError | undefined;
  seeErrorModal: (migration: Migration) => void;
}

export interface MigrationError {
  /**
   * Error title
   */
  title: string;
  /**
   * Error title
   */
  errorTitle: string;
  /**
   * Error stack
   */
  errorStackLines: string[];
}

export function useMigrationErrorModal(): UseMigrationError {
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);

  const [currentError, setCurrentError] = useState<MigrationError>();

  const seeErrorModal = (migration: Migration) => {
    setIsErrorModalVisible(true);

    const errorTitle = migration.error_stack?.split('\n')[0];
    const errorLines = migration.error_stack?.split('\n').slice(1);

    setCurrentError({
      title: `Error in ${migration.name} file.`,
      errorTitle: errorTitle || '',
      errorStackLines: errorLines || [],
    });
  };

  return {
    isErrorModalVisible,
    setIsErrorModalVisible,
    currentError,
    seeErrorModal,
  };
}
