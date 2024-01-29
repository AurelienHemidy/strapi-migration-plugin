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
  Badge,
  Button,
  IconButton,
} from '@strapi/design-system';
import { Refresh, Eye, EyeStriked, Trash, Plus, Scissors } from '@strapi/icons';

// Components
import { EmptyState } from '../../helpers/empty-state';

//Hooks
import { useDeprecatedFields } from '../../../hooks/useDeprecatedFields';
import { useMigrationsConfig } from '../../../hooks/useMigrationsConfig';
import { ErrorBanner } from '../../helpers/error-banner';
import { AddDeprecatedFieldModal } from '../add-modal';

export const DeprecatedFields = () => {
  const tableColumnName = ['ID', 'Attribute', 'Content-type', 'Actions'];

  const {
    deprecatedFields,
    error,
    fetchDeprecatedFields,
    deleteDeprecatedField,
    softDeleteDeprecatedField,
    toggleDeprecatedFieldVisibility,
    addDeprecatedField,
    isAddDeprecatedFieldModalOpen,
    setIsAddDeprecatedFieldModalOpen,
  } = useDeprecatedFields();

  const { isDevelopmentEnv } = useMigrationsConfig();

  if (error)
    return (
      <Box paddingTop={10}>
        <Box paddingTop={10}>
          <Typography variant="beta" textColor="neutral800">
            Deprecated fields
          </Typography>
        </Box>
        <ErrorBanner
          title="An error occured while fetching deprecated fields"
          text={error?.message}
        />
      </Box>
    );

  if (deprecatedFields.length === 0)
    return (
      <Box paddingTop={10}>
        <Typography variant="beta" textColor="neutral800">
          Deprecated fields
        </Typography>

        <Box paddingTop={3}>
          <EmptyState
            text="No deprecated fields yet"
            buttonText="Create your first deprecated Field"
            actionFunction={() => setIsAddDeprecatedFieldModalOpen(true)}
          />
        </Box>
        <AddDeprecatedFieldModal
          isAddDeprecatedFieldModalOpen={isAddDeprecatedFieldModalOpen}
          setIsAddDeprecatedFieldModalOpen={setIsAddDeprecatedFieldModalOpen}
          addDeprecatedField={addDeprecatedField}
        />
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
            {"There's "}
            <Badge backgroundColor="buttonPrimary600" textColor="neutral800">
              {deprecatedFields.length}
            </Badge>{' '}
            fields to delete.
          </Typography>
          <Flex gap={2}>
            {isDevelopmentEnv && (
              <Button
                variant="secondary"
                onClick={() => setIsAddDeprecatedFieldModalOpen(true)}
              >
                <Flex>
                  <Icon as={Plus} marginRight={2} />
                  Add
                </Flex>
              </Button>
            )}
            {isDevelopmentEnv && (
              <Button variant="secondary" onClick={fetchDeprecatedFields}>
                <Flex>
                  <Icon as={Refresh} marginRight={2} />
                  Refresh
                </Flex>
              </Button>
            )}
          </Flex>
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
            {deprecatedFields?.map(deprecatedField => (
              <Tr key={deprecatedField.id}>
                <Td>
                  <Typography textColor="neutral800">
                    {deprecatedField.id}
                  </Typography>
                </Td>
                <Td>
                  <Typography textColor="neutral800">
                    {deprecatedField.attribute}
                  </Typography>
                </Td>
                <Td>
                  <Typography textColor="neutral800">
                    {deprecatedField.content_type}
                  </Typography>
                </Td>
                <Td>
                  <Flex gap={2}>
                    <IconButton
                      onClick={() =>
                        toggleDeprecatedFieldVisibility(deprecatedField.id)
                      }
                      label={`${
                        deprecatedField.visible ? 'Hide' : 'Show'
                      } the field`}
                      icon={deprecatedField.visible ? <Eye /> : <EyeStriked />}
                    />
                    <IconButton
                      onClick={() => deleteDeprecatedField(deprecatedField.id)}
                      label="Delete the field in db"
                      icon={<Trash />}
                    />
                    <IconButton
                      onClick={() =>
                        softDeleteDeprecatedField(deprecatedField.id)
                      }
                      label="Delete the field only in UI"
                      icon={<Scissors />}
                    />
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      <AddDeprecatedFieldModal
        isAddDeprecatedFieldModalOpen={isAddDeprecatedFieldModalOpen}
        setIsAddDeprecatedFieldModalOpen={setIsAddDeprecatedFieldModalOpen}
        addDeprecatedField={addDeprecatedField}
      />
    </>
  );
};
