export interface Migration {
  /**
   * Name of the migration
   */
  name: string;
  /**
   * Status of the migration
   */
  status: 'success' | 'fail';
  /**
   * Error message if the migration failed
   */
  error_stack?: Error['stack'] | null;
  /**
   * Date when the migration was executed
   */
  migrated_at: Date | null;
}
