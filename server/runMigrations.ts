import { updateMigrationsGlobalStatus } from './migrationProcess';
import { Migration } from './types/migration';
import { MigrationRunReturn } from './types/migrationRunReturn';
import * as ts from 'typescript';

const fs = require('fs');
const fsPromises = require('fs').promises;
const vm = require('vm');

export async function runMigrations(): Promise<void> {
  const MIGRATION_SCRIPTS_ROOT_FOLDER_PATH =
    process.env.MIGRATION_SCRIPTS_ROOT_FOLDER_PATH ?? 'migrations/scripts';

  const knex = strapi.db.connection;

  console.log(`\n* running migrations *`);

  const [migrationConfig]: { active_dry_mode: boolean }[] = await knex(
    'cms_migrations_config'
  ).where({
    id: 1,
  });

  // Get all migrations file names inside /migrations-scripts
  const migrationFileNames: string[] = fs.readdirSync(
    MIGRATION_SCRIPTS_ROOT_FOLDER_PATH
  );

  for (const migrationFileName of migrationFileNames) {
    // Get the name of the migration files if it exists in database
    const [fileName] = await knex<Migration>('strapi_migrations')
      .select('name')
      .where('name', migrationFileName);

    // If undefined, run the migration file with same name
    if (!fileName) {
      console.log(`* running "${migrationFileName}" file *`);

      // Read the TS migration file
      const file = await fsPromises.readFile(
        `migrations/scripts/${migrationFileName}`,
        'utf8'
      );

      // Transpile the TS migration file to JS
      const migrationScript = tsScriptToJsScript(file);

      const { error }: MigrationRunReturn = await runFile(
        migrationScript,
        migrationConfig.active_dry_mode
      );

      console.log(
        `* "${migrationFileName}" migration ${error ? 'failed' : 'success'} *`
      );

      if (error) {
        // Update the global status of the migrations
        await updateMigrationsGlobalStatus('fail');
      }

      // Insert the migration file in database
      if (!migrationConfig.active_dry_mode) {
        await knex<Migration>('strapi_migrations').insert({
          name: migrationFileName,
          status: error ? 'fail' : 'success',
          error_stack: error ? error.stack : null,
          migrated_at: new Date(),
        });
      }
    }
  }

  // Update the global status of the migrations
  await updateMigrationsGlobalStatus('completed');

  return console.log(`*  migrations done *\n`);
}

/**
 * Transpile TypeScript to JavaScript
 * @param {string} source - Typescript source string.
 * @param {ts.TranspileOptions} options - Options for the compiler.
 * @returns {string} - Transpiled JavaScript string.
 */
function tsCompile(source: string, options: ts.TranspileOptions): string {
  return ts.transpileModule(source, options).outputText;
}

/**
 * Transpile TypeScript script to JavaScript script
 * @param {string} file - Typescript source string.
 * @returns {up: Function} - up function from ts file transpiled in js.
 */
function tsScriptToJsScript(file: string): { up: () => Promise<any> } {
  const transpiledFile = tsCompile(file, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      moduleResolution: ts.ModuleResolutionKind.NodeJs,
      target: ts.ScriptTarget.ES5,
    },
  });

  const context = vm.createContext({
    require,
    exports: {},
    strapi,
    console,
  });

  vm.runInContext(transpiledFile, context);

  return context;
}

async function runFile(
  migrationFile: {
    up: () => Promise<any>;
  },
  activeDryMode: boolean
): Promise<MigrationRunReturn> {
  let error: Error | null = null;

  try {
    await strapi.db.transaction(async transaction => {
      await migrationFile.up();

      // If mode is "dry", rollback changes after running the migration file
      if (activeDryMode) {
        console.info('DRY MODE active - rolling back changes');
        await transaction.rollback();
      }
    });
  } catch (err) {
    if (err) {
      error = err as Error;
    }
    console.error('Migration file', err);
  } finally {
    return {
      error: error,
    };
  }
}
