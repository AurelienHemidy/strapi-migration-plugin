const fs = require('fs');

/**
 * Check if native strapi migrations are enabled
 * by checking if there are any migration files in /database/migrations
 */
export function isNativeStrapiMigrationsEnabled(): boolean {
  const nativeMigrationFiles: string[] = fs.readdirSync('database/migrations');

  return nativeMigrationFiles.length > 0;
}
