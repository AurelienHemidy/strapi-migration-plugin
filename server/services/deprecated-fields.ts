import { Strapi } from '@strapi/strapi';

const fsPromises = require('fs').promises;

export default ({ strapi }: { strapi: Strapi }) => ({
  async find() {
    const MIGRATION_DEPRECATED_FIELD_ROOT_FOLDER_PATH =
      process.env.MIGRATION_DEPRECATED_FIELD_ROOT_FOLDER_PATH ??
      'migrations/deprecated-fields';

    const deprecated_fields_JSON = await fsPromises.readFile(
      `${MIGRATION_DEPRECATED_FIELD_ROOT_FOLDER_PATH}/deprecated-fields.json`
    );

    const deprecated_fields = JSON.parse(deprecated_fields_JSON);

    return deprecated_fields;
  },
});
