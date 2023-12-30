import React from 'react';
import { Loader, Box, EmptyStateLayout } from '@strapi/design-system';

export interface MigrationsLoaderProps {
  /**
   * Text of the loader
   */
  text: string;
}

export const MigrationsLoader = ({ text }: MigrationsLoaderProps) => {
  return (
    <Box background="neutral100">
      <EmptyStateLayout icon={<Loader />} content={text} />
    </Box>
  );
};
