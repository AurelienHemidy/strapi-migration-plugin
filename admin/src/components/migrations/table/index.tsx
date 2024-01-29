import React from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Th,
  Box,
  Typography,
  Icon,
  Flex,
  Button,
  IconButton,
} from '@strapi/design-system';

import { Check, Cross, Trash } from '@strapi/icons';
import { capitalize } from '../../../utils/capitalize';

// Components
import { MigrationsLoader } from '../loader';
import { EmptyState } from '../../helpers/empty-state';
import { MigrationModal } from '../../helpers/modal';

// Hooks
import { useMigrations } from '../../../hooks/useMigrations';
import { useMigrationErrorModal } from '../../../hooks/useMigrationErrorModal';
import { ErrorBanner } from '../../helpers/error-banner';

export const MigrationsTable = () => {
  const tableColumnName = [
    'ID',
    'File Name',
    'Status',
    'Migrated At',
    'Actions',
  ];

  const { migrations, isLoading, error, deleteMigration } = useMigrations();

  const {
    currentError,
    isErrorModalVisible,
    setIsErrorModalVisible,
    seeErrorModal,
  } = useMigrationErrorModal();

  if (isLoading) return <MigrationsLoader text="Getting migrations..." />;

  if (error)
    return (
      <Box paddingTop={10}>
        <ErrorBanner
          title="An error occured while fetching migrations"
          text={error?.message}
        />
      </Box>
    );

  if (migrations.length === 0)
    return <EmptyState text="No migrations ran yet" />;

  return (
    <>
      <Box background="neutral100">
        <Table colCount={6} rowCount={10}>
          <Thead>
            <Tr>
              {tableColumnName.map((columnName, index) => (
                <Th key={index}>
                  <Typography variant="sigma">{columnName}</Typography>
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {migrations?.map(migration => (
              <Tr key={migration.id}>
                <Td>
                  <Typography textColor="neutral800">{migration.id}</Typography>
                </Td>
                <Td>
                  <Typography textColor="neutral800">
                    {migration.name}
                  </Typography>
                </Td>
                <Td>
                  <Flex gap={2}>
                    <Icon
                      color={
                        migration.status === 'success'
                          ? 'success500'
                          : 'danger500'
                      }
                      as={migration.status === 'success' ? Check : Cross}
                    />

                    <Typography textColor="neutral800">
                      {capitalize(migration.status)}
                    </Typography>
                  </Flex>
                </Td>
                <Td>
                  <Typography textColor="neutral800">
                    {migration.migrated_at}
                  </Typography>
                </Td>
                <Td>
                  <Flex gap={2}>
                    {/* <IconButton
                      onClick={() => onRun(migration.id)}
                      label="Run the migration"
                      icon={<Play />}
                    /> */}
                    <IconButton
                      onClick={() => deleteMigration(migration.id)}
                      label="Delete the migration in db"
                      icon={<Trash />}
                    />
                    {migration.status === 'fail' && (
                      <Button
                        onClick={() => seeErrorModal(migration)}
                        variant="danger"
                        color="danger500"
                      >
                        See error
                      </Button>
                    )}
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      <MigrationModal
        title={currentError?.title || ''}
        isVisible={isErrorModalVisible}
        setIsVisible={setIsErrorModalVisible}
      >
        <Typography textColor="danger800" fontWeight="bold">
          {currentError?.errorTitle}
        </Typography>
        <Typography textColor="danger800">
          {currentError?.errorStackLines?.map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </Typography>
      </MigrationModal>
    </>
  );
};
