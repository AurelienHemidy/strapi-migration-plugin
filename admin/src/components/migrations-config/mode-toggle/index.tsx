import React from 'react';
import { Grid, Typography, GridItem, Box, Switch } from '@strapi/design-system';

// Components
import { ErrorBanner } from '../../helpers/error-banner';

// Hooks
import { useMigrationsConfig } from '../../../hooks/useMigrationsConfig';

export interface MigrationModeToggleProps {
  /**
   * Title of the toggle
   */
  title: string;
}

export const MigrationModeToggle = ({ title }: MigrationModeToggleProps) => {
  const { migrationsConfig, isDevelopmentEnv, error, toggleDryMode } =
    useMigrationsConfig();

  if (error)
    return (
      <Box paddingTop={10}>
        <ErrorBanner
          title="An error occured while fetching migrations configuration"
          text={error?.message}
        />
      </Box>
    );

  if (!isDevelopmentEnv) return null;

  return (
    <>
      <Grid gap={2}>
        <GridItem col={3}>
          <Box paddingBottom={2}>
            <Typography variant="delta" textColor="neutral800">
              {title}
            </Typography>
          </Box>
          <Switch
            label="Migration mode"
            visibleLabels
            onChange={toggleDryMode}
            selected={migrationsConfig?.active_dry_mode ?? true}
          ></Switch>
        </GridItem>
      </Grid>
    </>
  );
};
