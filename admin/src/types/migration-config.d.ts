interface MigrationConfig {
  id: number;
  /**
   * Is migration dry mode active
   */
  active_dry_mode: boolean;
  /**
   * Is development environment
   */
  is_dev: boolean;
}
