#!/usr/bin/env zx

/**
 * This script creates a migration file with everything needed to perform db querys inside transactions,
 *
 * It will create a migration file inside migrations/scripts folder
 */

const fs = require('fs').promises;
const fse = require('fs-extra');
const path = require('path');

const MIGRATION_SCRIPTS_ROOT_FOLDER_PATH =
  process.env.MIGRATION_SCRIPTS_ROOT_FOLDER_PATH ??
  path.join('migrations', 'scripts');

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

/**
 * Represents a prompt in terminal.
 * @constructor
 * @param {string} question - The question of the prompt.
 * @param {string} defaultValue - The default value of the prompt.
 */
const prompt = (question, defaultValue) => {
  return new Promise(resolve => {
    readline.question(question, data => {
      if (data.length === 0 && !defaultValue) {
        console.error('ERROR: No value provided for the file');
        return readline.close();
      }

      data = data.length === 0 ? defaultValue : data;

      resolve(data);
    });
  });
};

/**
 * Return the current date in YYYY_MM_DD format for the date hint.
 * @returns {string} date - The current date in YYYY_MM_DD format.
 */
const getMigrationDefaultDate = () =>
  new Date().toISOString().substring(0, 10).replace(/-/g, '_');

/**
 * Return the hint for the next migration.
 * @returns {string} number - The latest potential number for the next migration.
 */
const getNumberDefaultValue = async () => {
  const migrationFileNames = await fs.readdir(
    MIGRATION_SCRIPTS_ROOT_FOLDER_PATH
  );

  // Get the migration files of the day
  const migrationFilesOfTheDay = migrationFileNames.filter(fileName =>
    fileName.includes(getMigrationDefaultDate())
  );

  // If no migration files of today, return 01
  if (migrationFilesOfTheDay.length === 0) return '01';

  const migrationNumberOfTheDay = migrationFilesOfTheDay.map(
    fileName => fileName.split('.')[1]
  );

  const highestMigrationNumberOfTheDay = migrationNumberOfTheDay.reduce(
    (acc, curr) => {
      if (curr > acc) return curr;
    },
    0
  );

  return `0${parseInt(highestMigrationNumberOfTheDay) + 1}`;
};

const createFile = ({ date, number, name }) => {
  fse.outputFile(
    `${MIGRATION_SCRIPTS_ROOT_FOLDER_PATH}/${date}.${number}.${name}.ts`,
    `
/**
 * Migration file that migrates OUTDATED -> (PLACEHOLDER) fields | content-type | components
 * to NEW -> (PLACEHOLDER) fields | content-type | components
 * in (PLACEHOLDER) content-type | components
 */

export async function up(): Promise<void> {
  
}
  `,
    function (err) {
      if (err) throw err;
      console.log(
        `Migration file ${date}.${number}.${name}.ts created inside ${MIGRATION_SCRIPTS_ROOT_FOLDER_PATH} !`
      );
    }
  );
};

const run = async () => {
  // Migration Date (YYYY_MM_DD)
  const defaultDate = getMigrationDefaultDate();
  const date = await prompt(`Migration date (${defaultDate})? `, defaultDate);

  // Migration Number (incremental of the day starting at 01) ?
  const defaultNumber = await getNumberDefaultValue();
  const number = await prompt(
    `Migration number (${defaultNumber}) of the day? `,
    defaultNumber
  );

  // Migration Name describing the migration
  const name = await prompt('Migration name ? ');

  // Migration whole name
  const confirmation = await prompt(
    `File ${date}.${number}.${name}.ts will be created. Confirm ? (y/n) `,
    'y'
  );

  readline.close();

  if (confirmation !== 'y') {
    return console.log('Aborted');
  }

  // Get all migrations file names inside /migrations-scripts
  const migrationFileNames = await fs.readdir(
    MIGRATION_SCRIPTS_ROOT_FOLDER_PATH
  );

  if (migrationFileNames.includes(`${date}.${number}.${name}.ts`)) {
    return console.error(
      `ERROR: ${date}.${number}.${name}.ts file already exists in migrations/scripts folder`
    );
  }

  return createFile({ date, number, name });
};

run();
