interface DeprecatedField {
  id: string;
  /**
   * Name of the field
   */
  attribute: string;
  /**
   * Content type of the field if it exists
   */
  content_type: string | null;
  /**
   * Is the field visible in the content-manager
   */
  visible: boolean;
}
