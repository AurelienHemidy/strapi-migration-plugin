import React from 'react';
import { Box, Icon, EmptyStateLayout } from '@strapi/design-system';

import { Rocket } from '@strapi/icons';

export interface EmptyStateProps {
  /**
   * Text of the empty state
   */
  text: string;
}

export const EmptyState = ({ text }: EmptyStateProps) => {
  return (
    <>
      <Box background="neutral100">
        <EmptyStateLayout
          icon={
            <Icon
              as={Rocket}
              width={`${55 / 16}rem`}
              height={`${55 / 16}rem`}
            />
          }
          content={text}
        />
      </Box>
    </>
  );
};
