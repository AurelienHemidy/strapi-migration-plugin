import React, { useState } from "react";
import { Grid, Typography, GridItem, Box, Switch } from "@strapi/design-system";

export interface MigrationModeToggleProps {
  /**
   * Title of the toggle
   */
  title: string;
  /**
   * Is in Development environment
   */
  isDevelopmentEnv: boolean;
  /**
   * Dry mode
   */
  activeDryMode: boolean;
  /**
   * Toggle migrations dry mode
   */
  toggleDryMode: () => void;
}

export const MigrationModeToggle = ({
  title,
  isDevelopmentEnv,
  activeDryMode,
  toggleDryMode,
}: MigrationModeToggleProps) => {
  if (!isDevelopmentEnv) return null;

  return (
    <Grid gap={2}>
      <GridItem col={3}>
        <Box paddingBottom={2}>
          <Typography variant="delta" textColor="neutral800">
            {title}
          </Typography>
        </Box>
        {/* <ToggleCheckbox
          onLabel="True"
          offLabel="False"
          checked={withDatabaseInsertions}
          onChange={() => toggleDatabaseInsertions()}
        ></ToggleCheckbox> */}
        <Switch
          label="Migration mode"
          visibleLabels
          onChange={() => toggleDryMode()}
          selected={activeDryMode}
        ></Switch>
      </GridItem>
    </Grid>
  );
};
