import React from 'react';
import {
  Layout,
  BaseHeaderLayout,
  ContentLayout,
  Box,
  Icon,
  Flex,
  Button,
} from '@strapi/design-system';
import { Refresh, Play } from '@strapi/icons';

// Components
import { DeprecatedFields } from '../../components/deprecated-fields/table';
import { MigrationsTable } from '../../components/migrations/table';
import { MigrationsInfoTile } from '../../components/migrations/info-tile';
import { MigrationModeToggle } from '../../components/migrations-config/mode-toggle';

// Hooks
import { useMigrationsConfig } from '../../hooks/useMigrationsConfig';
import { useMigrations } from '../../hooks/useMigrations';

const HomePage = () => {
  const {
    migrations,
    isLoading: isMigrationsLoading,
    error: migrationsError,
    fetchMigrations,
    runMigrations,
    deleteMigration,
    migrationsSucceeded,
    migrationsFailed,
  } = useMigrations();

  const { isDevelopmentEnv } = useMigrationsConfig();

  return (
    <Layout>
      <BaseHeaderLayout
        title="Migrations plugin"
        subtitle="All your migrations in one place."
        as="h2"
      />
      <ContentLayout>
        <Box paddingBottom={4}>
          <MigrationModeToggle title="Dry mode" />
          <Box paddingTop={7}>
            <Flex gap={2} justifyContent="space-between">
              {!migrationsError && (
                <>
                  <Flex gap={2}>
                    <MigrationsInfoTile
                      text="migrations run"
                      number={migrations.length}
                      textColor="neutral800"
                      isMigrationsArrayEmpty={!migrations.length}
                    />
                    <MigrationsInfoTile
                      text="migrations succeeded"
                      number={migrationsSucceeded.length}
                      textColor="success500"
                      isMigrationsArrayEmpty={!migrationsSucceeded.length}
                    />
                    <MigrationsInfoTile
                      text="migrations failed"
                      number={migrationsFailed.length}
                      textColor="danger500"
                      isMigrationsArrayEmpty={!migrationsFailed.length}
                    />
                  </Flex>
                  <Flex gap={2}>
                    {isDevelopmentEnv && (
                      <Button onClick={runMigrations}>
                        <Flex>
                          <Icon as={Play} marginRight={2} />
                          Run migrations
                        </Flex>
                      </Button>
                    )}
                    {isDevelopmentEnv && (
                      <Button variant="secondary" onClick={fetchMigrations}>
                        <Flex>
                          <Icon as={Refresh} marginRight={2} />
                          Refresh
                        </Flex>
                      </Button>
                    )}
                  </Flex>
                </>
              )}
            </Flex>
          </Box>
        </Box>

        <MigrationsTable
          migrations={migrations}
          isLoading={isMigrationsLoading}
          error={migrationsError}
          fetchMigrations={fetchMigrations}
          deleteMigration={deleteMigration}
        />

        <DeprecatedFields />
      </ContentLayout>
    </Layout>
  );
};

export default HomePage;
