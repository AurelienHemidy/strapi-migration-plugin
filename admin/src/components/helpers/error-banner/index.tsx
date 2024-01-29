import React from 'react';
import { Typography, Box, Flex, Status, Icon } from '@strapi/design-system';
import { EmotionUnhappy } from '@strapi/icons';

export interface ErrorBannerProps {
  /**
   * Text of the banner
   */
  text: string;
  /**
   * Title of the banner
   */
  title: string;
}

export const ErrorBanner = ({ text, title }: ErrorBannerProps) => {
  return (
    <>
      <Box hasRadius>
        <Flex justifyContent="center">
          <Status variant="danger" showBullet={false} borderColor="danger500">
            <Flex justifyContent="center" direction="column">
              <Flex justifyContent="center">
                <Icon as={EmotionUnhappy} color="danger500" marginRight={2} />
                <Typography textColor="danger500" variant="delta">
                  {title}
                </Typography>
              </Flex>

              <Typography textColor="danger500">{text}</Typography>
            </Flex>
          </Status>
        </Flex>
      </Box>
    </>
  );
};
