import { Strapi } from '@strapi/strapi';
import { v4 as uuidv4 } from 'uuid';

const fsPromises = require('fs').promises;

export default ({ strapi }: { strapi: Strapi }) => ({
  async get() {
    const MIGRATION_DEPRECATED_FIELD_ROOT_FOLDER_PATH =
      process.env.MIGRATION_DEPRECATED_FIELD_ROOT_FOLDER_PATH ??
      'migrations/deprecated-fields';

    const deprecated_fields_JSON = await fsPromises.readFile(
      `${MIGRATION_DEPRECATED_FIELD_ROOT_FOLDER_PATH}/deprecated-fields.json`
    );

    try {
      const deprecated_fields = JSON.parse(deprecated_fields_JSON);
      return deprecated_fields;
    } catch (error) {
      return [];
    }
  },
  async toggleVisibility(id: string) {
    const MIGRATION_DEPRECATED_FIELD_ROOT_FOLDER_PATH =
      process.env.MIGRATION_DEPRECATED_FIELD_ROOT_FOLDER_PATH ??
      'migrations/deprecated-fields';
    const deprecated_fields_JSON = await fsPromises.readFile(
      `${MIGRATION_DEPRECATED_FIELD_ROOT_FOLDER_PATH}/deprecated-fields.json`
    );
    const deprecated_fields = JSON.parse(deprecated_fields_JSON);

    // Update the migration-plugin/deprecated-fields.json file
    const updated_deprecated_fields = deprecated_fields.map(
      (deprecated_field: any) => {
        if (deprecated_field.id === id) {
          return {
            ...deprecated_field,
            visible: !deprecated_field.visible,
          };
        }
        return deprecated_field;
      }
    );
    await fsPromises.writeFile(
      `${MIGRATION_DEPRECATED_FIELD_ROOT_FOLDER_PATH}/deprecated-fields.json`,
      JSON.stringify(updated_deprecated_fields, null, 2)
    );

    //Update the field in the content-type
    const deprecatedField = updated_deprecated_fields.find(
      field => field.id === id
    );

    const contentTypeToUpdateJSON = await fsPromises.readFile(
      `src/api/${deprecatedField.content_type}/content-types/${deprecatedField.content_type}/schema.json`
    );
    const contentTypeToUpdate = JSON.parse(contentTypeToUpdateJSON);

    const updated_content_type = {
      ...contentTypeToUpdate,
      attributes: {
        ...contentTypeToUpdate.attributes,
        [deprecatedField.attribute]: {
          ...contentTypeToUpdate.attributes[deprecatedField.attribute],
          visible: deprecatedField.visible,
        },
      },
    };

    await fsPromises.writeFile(
      `src/api/${deprecatedField.content_type}/content-types/${deprecatedField.content_type}/schema.json`,
      JSON.stringify(updated_content_type, null, 2)
    );

    return updated_deprecated_fields;
  },
  async delete(id: string, target: 'json' | 'contentType') {
    const MIGRATION_DEPRECATED_FIELD_ROOT_FOLDER_PATH =
      process.env.MIGRATION_DEPRECATED_FIELD_ROOT_FOLDER_PATH ??
      'migrations/deprecated-fields';
    const deprecated_fields_JSON = await fsPromises.readFile(
      `${MIGRATION_DEPRECATED_FIELD_ROOT_FOLDER_PATH}/deprecated-fields.json`
    );
    const deprecated_fields: DeprecatedField[] = JSON.parse(
      deprecated_fields_JSON
    );

    // Delete the field in the migration-plugin/deprecated-fields.json file
    if (target === 'json') {
      console.log('deprecated_fields');
      const updated_deprecated_fields = deprecated_fields.filter(
        deprecatedField => deprecatedField.id !== id
      );

      await fsPromises.writeFile(
        `${MIGRATION_DEPRECATED_FIELD_ROOT_FOLDER_PATH}/deprecated-fields.json`,
        JSON.stringify(updated_deprecated_fields, null, 2)
      );

      return updated_deprecated_fields;
    }

    //Delete the field in the content-type
    if (target === 'contentType') {
      const deprecatedField = deprecated_fields.find(field => field.id === id);
      const contentTypeToUpdateJSON = await fsPromises.readFile(
        `src/api/${deprecatedField?.content_type}/content-types/${deprecatedField?.content_type}/schema.json`
      );
      const contentTypeToUpdate = JSON.parse(contentTypeToUpdateJSON);

      delete contentTypeToUpdate.attributes[
        deprecatedField?.attribute as string
      ];

      await fsPromises.writeFile(
        `src/api/${deprecatedField?.content_type}/content-types/${deprecatedField?.content_type}/schema.json`,
        JSON.stringify(contentTypeToUpdate, null, 2)
      );
      return contentTypeToUpdate;
    }
  },
  async create(contentType: string, attribute: string) {
    const MIGRATION_DEPRECATED_FIELD_ROOT_FOLDER_PATH =
      process.env.MIGRATION_DEPRECATED_FIELD_ROOT_FOLDER_PATH ??
      'migrations/deprecated-fields';

    const deprecated_fields_JSON = await fsPromises.readFile(
      `${MIGRATION_DEPRECATED_FIELD_ROOT_FOLDER_PATH}/deprecated-fields.json`
    );

    try {
      const deprecated_fields = JSON.parse(deprecated_fields_JSON);
      deprecated_fields.push({
        id: uuidv4(),
        attribute: attribute,
        content_type: contentType,
        visible: true,
      });

      await fsPromises.writeFile(
        `${MIGRATION_DEPRECATED_FIELD_ROOT_FOLDER_PATH}/deprecated-fields.json`,
        JSON.stringify(deprecated_fields, null, 2)
      );

      return {
        contentType,
        attribute,
        deprecated_fields,
      };
    } catch (error) {
      return error;
    }
  },
});
