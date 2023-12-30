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
} from '@strapi/design-system';

import { Check, Cross } from '@strapi/icons';
import { capitalize } from '../../../utils/capitalize';

// Components
import { MigrationsLoader } from '../migrations-loader';
import { EmptyState } from '../../helpers/empty-state';

export interface MigrationsTableProps {
  /**
   * Migrations array
   */
  migrations: Migration[];
  /**
   * Is migrations loading
   */
  isMigrationsLoading: boolean;
}

export interface Migration {
  id: number;
  /**
   * Name of the migration
   */
  name: string;
  /**
   * Status of the migration
   */
  status: 'success' | 'fail';
  /**
   * CMS target version of the migration
   */
  target_version: string;
  /**
   * Date of the migrations execution
   */
  migrated_at: Date | null;
}

export const MigrationsTable = ({
  migrations,
  isMigrationsLoading,
}: MigrationsTableProps) => {
  const tableColumnName = [
    'ID',
    'File Name',
    'Status',
    'Target version',
    'Migrated At',
  ];
  if (isMigrationsLoading)
    return <MigrationsLoader text="Getting migrations..." />;

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
            {migrations.map(migration => (
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
                  <Flex>
                    <Icon
                      color={
                        migration.status === 'success'
                          ? 'success500'
                          : 'danger500'
                      }
                      as={migration.status === 'success' ? Check : Cross}
                      marginRight={2}
                    />

                    <Typography textColor="neutral800">
                      {capitalize(migration.status)}
                    </Typography>
                  </Flex>
                </Td>
                <Td>
                  <Typography textColor="neutral800">
                    {migration.target_version}
                  </Typography>
                </Td>
                <Td>
                  <Typography textColor="neutral800">
                    {migration.migrated_at}
                  </Typography>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </>
  );
};
