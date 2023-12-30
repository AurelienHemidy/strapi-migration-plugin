import React from 'react';

// Strapi
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
  Badge,
  Button,
} from '@strapi/design-system';
import { Check, Cross, Refresh } from '@strapi/icons';

// Components
import { EmptyState } from '../helpers/empty-state';

export interface DeprecatedField {
  id: number;
  /**
   * Name of the field
   */
  name: string;
  /**
   * CMS version when the field was deprecated
   */
  deprecated_version: string;
  /**
   * CMS version when the field was deleted
   */
  delete_version: string;
  /**
   * Type of the field
   */
  type: 'field' | 'content-type' | 'component';
  /**
   * Content type of the field if it exists
   */
  content_type: string | null;
  /**
   * Component name of the field if it exists
   */
  component: string | null;
}

export interface DeprecatedFieldProps {
  /**
   * Deprecated fields array stored in JSON
   */
  deprecatedFields: DeprecatedField[];
  /**
   * Function to fetch deprecated fields
   */
  fetchDeprecatedFields: () => void;
  /**
   * Is in Development environment
   */
  isDevelopmentEnv: boolean;
}

export const DeprecatedFields = ({
  deprecatedFields,
  fetchDeprecatedFields,
  isDevelopmentEnv,
}: DeprecatedFieldProps) => {
  const tableColumnName = [
    'ID',
    'Name',
    'Deprecated version',
    'Delete version',
    'Type',
    'Content-type',
    'Component',
    'Status',
  ];

  if (deprecatedFields.length === 0)
    return (
      <Box paddingTop={10}>
        <Typography variant="beta" textColor="neutral800">
          Deprecated fields
        </Typography>

        <Box paddingTop={3}>
          <EmptyState text="No deprecated fields yet" />
        </Box>
      </Box>
    );

  return (
    <>
      <Box paddingTop={10}>
        <Typography variant="beta" textColor="neutral800">
          Deprecated fields
        </Typography>
      </Box>
      <Box paddingTop={3} paddingBottom={3}>
        <Flex justifyContent="space-between">
          <Typography variant="omega" textColor="neutral400">
            There's{' '}
            <Badge backgroundColor="buttonPrimary600" textColor="neutral800">
              {deprecatedFields.length}
            </Badge>{' '}
            fields to delete.
            {/* // TODO: Add a little logic to check the latest version since last deletion */}
            {/* since version <Badge>1.15.2</Badge> */}
          </Typography>
          {isDevelopmentEnv && (
            <Button variant="secondary" onClick={fetchDeprecatedFields}>
              <Flex>
                <Icon as={Refresh} marginRight={2} />
                Refresh
              </Flex>
            </Button>
          )}
        </Flex>
      </Box>
      <Box background="neutral100">
        <Table colCount={10} rowCount={6}>
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
            {deprecatedFields.map(deprecatedField => (
              <Tr key={deprecatedField.id}>
                <Td>
                  <Typography textColor="neutral800">
                    {deprecatedField.id}
                  </Typography>
                </Td>
                <Td>
                  <Typography textColor="neutral800">
                    {deprecatedField.name}
                  </Typography>
                </Td>
                <Td>
                  <Typography textColor="neutral800">
                    {deprecatedField.deprecated_version}
                  </Typography>
                </Td>
                <Td>
                  <Typography textColor="neutral800">
                    {deprecatedField.delete_version}
                  </Typography>
                </Td>
                <Td>
                  <Typography textColor="neutral800">
                    {deprecatedField.type}
                  </Typography>
                </Td>
                <Td>
                  <Typography textColor="neutral800">
                    {deprecatedField.content_type}
                  </Typography>
                </Td>
                <Td>
                  <Typography textColor="neutral800">
                    {deprecatedField.component}
                  </Typography>
                </Td>
                <Td>
                  <Flex>
                    <Icon
                      color={
                        deprecatedField.delete_version === ''
                          ? 'danger500'
                          : 'success500'
                      }
                      as={deprecatedField.delete_version === '' ? Cross : Check}
                      marginRight={2}
                    />
                    <Typography textColor="neutral800">
                      {deprecatedField.delete_version === ''
                        ? 'Not deleted'
                        : 'Deleted'}
                    </Typography>
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </>
  );
};
