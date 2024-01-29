import React, { Children }from 'react';
import {
  ModalLayout,
  ModalHeader,
  Typography,
  ModalBody,
  ModalFooter,
  Button,
} from '@strapi/design-system';


export interface MigrationModalProps {
  /**
   * Title of the modal
   */
  title: string;
  /**
   * Children of the modal
   */
  children: React.ReactNode;
  /**
   * Is modal visible
   */
  isVisible: boolean;
  /**
   * Set is visible
   */
  setIsVisible: (prev: boolean) => void;
}

export const MigrationModal = ({
  title,
  children,
  isVisible,
  setIsVisible,
}: MigrationModalProps) => {
  return (
    <>
      {isVisible && (
        <ModalLayout
          onClose={() => setIsVisible(false)}
          labelledBy="title"
          color="danger500"
        >
          <ModalHeader>
            <Typography
              fontWeight="bold"
              textColor="neutral800"
              as="h2"
              id="title"
            >
              {title}
            </Typography>
          </ModalHeader>
          <ModalBody>{Children.map(children, child => child)}</ModalBody>
          <ModalFooter
            startActions={
              <Button
                onClick={() => console.log('copy the error')}
                variant="tertiary"
              >
                Copy
              </Button>
            }
            endActions={
              <>
                <Button onClick={() => setIsVisible(false)}>Cancel</Button>
              </>
            }
          />
        </ModalLayout>
      )}
    </>
  );
};
