import React from 'react';
import { Box, Icon, EmptyStateLayout, Button } from '@strapi/design-system';

import { Rocket, Plus } from '@strapi/icons';

export interface EmptyStateProps {
  /**
   * Text of the empty state
   */
  text: string;
  /**
   * Action function of the empty state button
   */
  actionFunction?: () => void;
  /**
   * Button text of the empty state
   */
  buttonText?: string;
}

export const EmptyState = ({
  text,
  actionFunction,
  buttonText,
}: EmptyStateProps) => {
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
          action={
            actionFunction && (
              <Button
                variant="secondary"
                startIcon={<Plus />}
                onClick={() => actionFunction()}
              >
                {buttonText}
              </Button>
            )
          }
        />
      </Box>
    </>
  );
};
