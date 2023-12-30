/*
 * HomePage
 */

import React, { useEffect, useState } from 'react';

// Strapi
import {
  Layout,
  BaseHeaderLayout,
  ContentLayout,
  Box,
  Icon,
  Flex,
  Button,
} from '@strapi/design-system';
import { Refresh } from '@strapi/icons';

// API
import { migrationRequest } from '../../api/migrations';
import { migrationConfigRequest } from '../../api/migrations-config';
import { deprecatedFieldsRequest } from '../../api/deprecated';

// Components
import {
  DeprecatedField,
  DeprecatedFields,
} from '../../components/deprecated-fields';
import {
  Migration,
  MigrationsTable,
} from '../../components/migrations/migrations-table';
import { MigrationsInfoTile } from '../../components/migrations/migrations-info-tile';
import { MigrationModeToggle } from '../../components/migrations/migrations-config/migration-mode-toggle';

export interface MigrationConfig {
  id: number;
  /**
   * Is migration dry mode active
   */
  active_dry_mode: boolean;
  /**
   * Is development environment
   */
  is_dev: boolean;
}

const HomePage = () => {
  const [migrations, setMigrations] = useState<Migration[]>([]);
  const [migrationsConfig, setMigrationsConfig] = useState<MigrationConfig>();
  const [deprecatedFields, setDeprecatedFields] = useState<DeprecatedField[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);

  const [isDevelopmentEnv, setIsDevelopmentEnv] = useState(false);

  const fetchMigrations = async () => {
    if (isLoading === false) setIsLoading(true);
    const migrationsData = await migrationRequest.getAllMigrations();

    setMigrations(migrationsData);

    setIsLoading(false);
  };

  const fetchMigrationsConfig = async () => {
    if (isLoading === false) setIsLoading(true);
    const migrationsConfigData = await migrationConfigRequest.getConfig();

    setMigrationsConfig(migrationsConfigData);
    setIsDevelopmentEnv(migrationsConfigData.is_dev);

    setIsLoading(false);
  };

  const fetchDeprecatedFields = async () => {
    const deprecatedFieldsData: DeprecatedField[] =
      await deprecatedFieldsRequest.getAllDeprecatedFields();

    setDeprecatedFields(deprecatedFieldsData);
  };

  const toggleDryMode = async () => {
    await migrationConfigRequest.toggleDryMode();

    await fetchMigrationsConfig();
  };

  useEffect(() => {
    fetchMigrations();
    fetchMigrationsConfig();
    fetchDeprecatedFields();
  }, []);

  const migrationsSucceeded = migrations.filter(
    migration => migration.status === 'success'
  );
  const migrationsFailed = migrations.filter(
    migration => migration.status === 'fail'
  );

  return (
    <Layout>
      <BaseHeaderLayout
        title="Migrations plugin"
        subtitle="All your migrations in one place."
        as="h2"
      />

      <ContentLayout>
        <Box paddingBottom={4}>
          <MigrationModeToggle
            title="Dry mode"
            isDevelopmentEnv={isDevelopmentEnv}
            activeDryMode={migrationsConfig?.active_dry_mode ?? true}
            toggleDryMode={toggleDryMode}
          />
          <Box paddingTop={7}>
            <Flex gap={2} justifyContent="space-between">
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
              {isDevelopmentEnv && (
                <Button variant="secondary" onClick={fetchMigrations}>
                  <Flex>
                    <Icon as={Refresh} marginRight={2} />
                    Refresh
                  </Flex>
                </Button>
              )}
            </Flex>
          </Box>
        </Box>

        <MigrationsTable
          migrations={migrations}
          isMigrationsLoading={isLoading}
        />

        <DeprecatedFields
          deprecatedFields={deprecatedFields}
          fetchDeprecatedFields={fetchDeprecatedFields}
          isDevelopmentEnv={isDevelopmentEnv}
        />
      </ContentLayout>
    </Layout>
  );
};

export default HomePage;
