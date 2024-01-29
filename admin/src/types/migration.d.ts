interface Migration {
  id: number;
  /**
   * Name of the migration
   */
  name: string;
  /**
   * Status of the migration
   */
  status: 'success' | 'fail';
  /**
   * Error of the migration
   */
  error_stack: string | null;
  /**
   * Date of the migrations execution
   */
  migrated_at: Date | null;
}
