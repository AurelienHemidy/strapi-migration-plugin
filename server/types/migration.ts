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
   * Date when the migration was executed
   */
  migrated_at: Date | null;
}
