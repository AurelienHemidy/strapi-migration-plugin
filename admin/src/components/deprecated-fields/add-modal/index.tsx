import React, { useEffect, useState } from 'react';
import {
  SingleSelect,
  SingleSelectOption,
  Flex,
  Button,
  Icon,
} from '@strapi/design-system';
import { MigrationModal } from '../../helpers/modal';
import { Plus } from '@strapi/icons';

// Hooks
import { useContenTypes } from '../../../hooks/useContentTypes';

interface AddDeprecatedFieldModalProps {
  isAddDeprecatedFieldModalOpen: boolean;
  setIsAddDeprecatedFieldModalOpen: (value: boolean) => void;
  addDeprecatedField: (contentType?: string, field?: string) => void;
}

export const AddDeprecatedFieldModal = ({
  isAddDeprecatedFieldModalOpen,
  setIsAddDeprecatedFieldModalOpen,
  addDeprecatedField,
}: AddDeprecatedFieldModalProps) => {
  const [selectedContentType, setSelectedContentType] = useState<string>();
  const [selectedContentTypeAttributes, setSelectedContentTypeAttributes] =
    useState<string[]>();
  const [field, setField] = useState('');

  const { contentTypes } = useContenTypes();

  useEffect(() => {
    const contentTypeAttributes = contentTypes?.find(
      contentType => contentType.info.singularName === selectedContentType
    )?.attributes;

    setSelectedContentTypeAttributes(Object.keys(contentTypeAttributes ?? {}));
  }, [selectedContentType, contentTypes]);

  const closeModal = () => {
    setIsAddDeprecatedFieldModalOpen(false);
    setSelectedContentType('');
    setField('');
  };

  return (
    <MigrationModal
      title="Add a deprecated field"
      isVisible={isAddDeprecatedFieldModalOpen}
      setIsVisible={closeModal}
    >
      <Flex gap={2}>
        <SingleSelect
          label="Content type"
          required
          placeholder="Select a content type"
          hint="The content type where the deprecated field is located"
          value={selectedContentType}
          onChange={setSelectedContentType}
        >
          {contentTypes?.map(contentType => {
            return (
              <SingleSelectOption
                key={contentType.uid}
                value={contentType.info.singularName}
              >
                {contentType.info.displayName}
              </SingleSelectOption>
            );
          })}
        </SingleSelect>
        <SingleSelect
          label="Field"
          required
          placeholder="Select a field of the content-type"
          hint="The field that is deprecated"
          value={field}
          onChange={setField}
        >
          {selectedContentTypeAttributes?.map((attribute, index) => {
            return (
              <SingleSelectOption key={index} value={attribute}>
                {attribute}
              </SingleSelectOption>
            );
          })}
        </SingleSelect>
        <Button
          variant="secondary"
          size="L"
          onClick={() => addDeprecatedField(selectedContentType, field)}
        >
          <Flex>
            <Icon as={Plus} marginRight={2} />
            Add
          </Flex>
        </Button>
      </Flex>
    </MigrationModal>
  );
};
