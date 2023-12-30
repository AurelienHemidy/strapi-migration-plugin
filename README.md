# Strapi Migrations plugin

This plugin add the possibility to make migrations on Strapi.
It uses migration scripts with a transaction mecanism to make atomic migrations.
It can be used for:

- data model changes (_e.g._ rename a field, or move a data structure to another one)
- delete a field or a data structure (_e.g._ delete a field that is not used anymore)

## ⚠ Be careful

This plugin and Strapi's native migrations can't be used simultaneously.
If you want to use this plugin, you have to delete the native migrations inside the following folder: `./database/migrations`.

# Usage

## Installation

```
npm install strapi-migration-plugin
```

or

```
yarn add strapi-migration-plugin
```

## Workflow

To make the developer workflow easier, the `dry mode` option is available.

if you are in development mode :

- The `dry mode` option is active by default. It means that the migration scripts will be executed but the changes will not be applied to the database. It allows you to test and build your migration scripts without modifying your database. You can then toggle the `dry mode` option inside the Migrations plugin panel to apply the changes to the database.

if you are in production mode :

- The `dry mode` option is disabled. It means that the migration scripts will be executed and the changes will be applied to the database.

## Migration files

Migrations files are stored in `./migrations` folder at root of the strapi project.
To create a migration file, two options:

- Using the `create-migration-file` script (`yarn create-migration-file` or `npm run create-migration-file`)
- Creating a file in the migration folder, with the pattern: `YYYYMMDD.01.migration-name.js`

## Fields depreciation

You can add a json file in the `./migrations` folder of your strapi project called `deprecated-fields.json`.
It enables to keep track of the fields that have been migrated but not deleted yet. You can delete the fields later (inside a migration or manually) when you are sure that the fields are not used anymore.

```ts
Deprecated-field interface

{
  "id": number,
  /**
   * Name of the deprecated-field
   */
  "name": string,
  /**
   * CMS version when the field was deprecated
   */
  "deprecated_version": string,
  /**
   * CMS version when the field was deleted
   */
  "delete_version": string,
  /**
   * Type of the field
   */
  "type": "field" | "component" | "content-type",
  /**
   * Content type of the field if it exists
   */
  "content_type": string | null,
  /**
   * Component name of the field if it exists
   */
  "component": string | null
}
```

## Configuration

You can change the folder in which you store your migration files and deprecated-fields by adding the following variable to your `.env` file:

```
MIGRATION_SCRIPTS_ROOT_FOLDER_PATH="new-folder-path"
```
